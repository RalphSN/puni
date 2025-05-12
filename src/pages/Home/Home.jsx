import React from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Home.scss";
import cardData from "../../components/card/PopularCard/CardPopularData";
import reserveCardData from "../../components/card/ReserveCard/CardReserveCard";
import PopularCard from "../../components/card/PopularCard/PopularCard";
import ReserveCard from "../../components/card/ReserveCard/ReserveCard";
import ad01 from "../../assets/images/ad01.png";
import ad02 from "../../assets/images/ad02.png";
import { Link } from "react-router-dom";

const Home = () => {
  const { t } = useTranslation();

  const baseUrl =
    "https://cdn.jsdelivr.net/gh/RalphSN/images@main/sainttime-images/";
  const coverUrls = Array.from(
    { length: 5 },
    (_, index) => `${baseUrl}cover0${index + 1}.png`
  );
  const adUrls = Array.from(
    { length: 4 },
    (_, index) => `${baseUrl}ad0${index + 1}.png`
  );

  const adBannerUrls = [
    { image: ad01, link: "#" },
    { image: ad02, link: "#" },
  ];

  return (
    <main>
      <div className="home">
        <div className="home__carousel">
          <figure className="home__carousel-image__container">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop
            >
              {coverUrls.map((url, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={`${url}`}
                    alt={`slide-${index}`}
                    className="home__carousel-image"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </figure>
          <div className="ad-banner">
            {adBannerUrls.map((ad, index) => (
              <Link key={index} to={ad.link} className="ad-banner__link">
                <img
                  src={ad.image}
                  alt={`ad-${index}`}
                  className="ad-banner__img"
                />
              </Link>
            ))}
          </div>
        </div>
        <div className="home__content">
          <div className="home__popular">
            <h2 className="home__popular-title">{t("home.popularGames")}</h2>
            <div className="home__popular-grid">
              {cardData.map((card) => (
                <PopularCard
                  key={card.id}
                  id={card.id}
                  title={card.title}
                  image={card.image}
                  buttonText={card.buttonText}
                  className={card.className}
                />
              ))}
            </div>
            <div className="more-btn-box">
              <button className="btn-more">{t("home.more")}</button>
            </div>
          </div>
          <div className="home__side">
            <div className="home__side-reserve">
              <h2 className="home__side-reserve-title">{t("home.reserve")}</h2>
              <div className="home__reserve-list">
                {reserveCardData.map((game) => (
                  <ReserveCard
                    key={game.id}
                    title={game.title}
                    description={game.description}
                    image={game.image}
                    buttonText={game.buttonText}
                    url={game.url}
                  />
                ))}
              </div>
            </div>
            <div className="home__side-ad">
              <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                loop
              >
                {adUrls.map((url, index) => (
                  <SwiperSlide key={index}>
                    <a href="#" className="home__side-ad-link">
                      <img src={url} alt={`ad-${index}`} />
                    </a>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
