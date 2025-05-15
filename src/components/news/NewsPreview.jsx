import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Loading from "../common/Loading/Loading";
import thumbnail from "../../assets/images/thumbnail.png";
import "./NewsPreview.scss";

const NewsPreview = () => {
  // const { t } = useTranslation();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const getIsMobile = () =>
    typeof window !== "undefined" && window.innerWidth < 767;
  const [isMobile, setIsMobile] = useState(getIsMobile());

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("http://localhost:4000/news?_limit=5");
        const data = await res.json();

        if (!Array.isArray(data)) {
          console.warn("⚠️ API 回傳格式不正確：應該為陣列", data);
          return;
        }

        // 修正 thumbnail 與 category 的設置方式
        const enriched = data.map((item) => ({
          ...item,
          thumbnail: item.thumbnail || thumbnail,
          category: item.category || { "zh-TW": "最新消息", en: "News" },
        }));

        setNews(enriched);
      } catch (err) {
        setError(err.message || "發生錯誤，請稍後再試");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 767);
    };

    // 初始就確認一次
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat("zh-TW", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(dateString));
  };

  if (loading) return <Loading justifyContent="center" />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <section className="news-preview">
      <div className="news-preview__list">
        {news.map((item) =>
          isMobile ? (
            <Link
              key={item.id}
              to={`/news/${item.id}`}
              className="news-preview__item mobile"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="news-thumbnail__img"
              />
              <div className="news-preview__content">
                <div className="news-preview__box">
                  <span className="news-preview__category">
                    【{item.category?.["zh-TW"]}】
                  </span>
                  <p className="news-preview__date">{formatDate(item.date)}</p>
                </div>
                <h3 className="news-preview__headline">{item.title}</h3>
              </div>
            </Link>
          ) : (
            <Link
              key={item.id}
              to={`/news/${item.id}`}
              className="news-preview__item"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="news-thumbnail__img"
              />
              <div className="news-preview__content">
                <div className="news-preview__box">
                  <span className="news-preview__category">
                    【{item.category?.["zh-TW"]}】
                  </span>
                  <h3 className="news-preview__headline">{item.title}</h3>
                </div>
                <p className="news-preview__date">{formatDate(item.date)}</p>
              </div>
            </Link>
          )
        )}
      </div>
    </section>
  );
};

export default NewsPreview;
