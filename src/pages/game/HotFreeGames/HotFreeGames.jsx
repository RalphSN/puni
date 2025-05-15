import { useState } from "react";
import { useTranslation } from "react-i18next";
import cardHotData from "../../../components/card/HotFreeCard/HotFreeCardData";
import HotFreeCard from "../../../components/card/HotFreeCard/HotFreeCard";
import PopularCard from "../../../components/card/PopularCard/PopularCard";
import NotFound from "../../../components/common/NotFound/NotFound";
import titleLeft from "../../../assets/images/title-left.png";
import "./HotFreeGames.scss";

const HotFreeGames = () => {
  const { t } = useTranslation();

  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  const allTags = [...new Set(cardHotData.flatMap((card) => card.tagKeys))];
  const allPlatforms = [
    ...new Set(cardHotData.flatMap((card) => card.platforms)),
  ];

  const handleTagClick = (tag) => {
    setSelectedTags((prevSelected) =>
      prevSelected.includes(tag)
        ? prevSelected.filter((t) => t !== tag)
        : [...prevSelected, tag]
    );
  };

  const handlePlatformClick = (platform) => {
    setSelectedPlatforms((prevSelected) =>
      prevSelected.includes(platform)
        ? prevSelected.filter((p) => p !== platform)
        : [...prevSelected, platform]
    );
  };

  const filteredCards = cardHotData.filter((card) => {
    const matchesTags = selectedTags.length
      ? selectedTags.every((tag) => card.tagKeys.includes(tag))
      : true;

    const matchesPlatforms = selectedPlatforms.length
      ? selectedPlatforms.every((platform) => card.platforms.includes(platform))
      : true;

    return matchesTags && matchesPlatforms;
  });

  return (
    <section className="hot-games">
      <div className="hot-games__header">
        <h1 className="hot-games__title">
          <figure className="title-img__container">
            <img src={titleLeft} alt="title image" className="title-img" />
          </figure>
          <span className="title-text">遊戲列表</span>
        </h1>
      </div>

      <div className="hot-games__content">
        <div className="hot-games__filter-container">
          {/* 裝置類型篩選 */}
          <div className="hot-games__filter">
            <h2 className="hot-games__filter-title">
              {t("hot.filter-platform")}
            </h2>
            <div className="hot-games__filter-options">
              {allPlatforms.map((platform) => (
                <label key={platform} className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedPlatforms.includes(platform)}
                    onChange={() => handlePlatformClick(platform)}
                  />
                  <span className="checkbox-icon" />
                  <span className="label-text">
                    {t(`platforms.${platform}`)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* 遊戲類型篩選 */}
          <div className="hot-games__filter">
            <h2 className="hot-games__filter-title">{t("hot.filter-genre")}</h2>
            <div className="hot-games__filter-options">
              {allTags.map((tag) => (
                <label key={tag} className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag)}
                    onChange={() => handleTagClick(tag)}
                  />
                  <span className="checkbox-icon" />
                  <span className="label-text">{t(`tags.${tag}`)}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* 過濾後的卡片 */}
        <div className="hot-games__grid">
          {filteredCards.length > 0 ? (
            filteredCards.map((card) => (
              <PopularCard
                key={card.id}
                id={card.id}
                title={card.title}
                image={card.image}
                buttonText={card.buttonText}
                className={card.className}
              />
            ))
          ) : (
            <p className="no-results">
              {/* {t("hot.no-results")} */}
              <NotFound
                message={t("hot.no-results")}
                height={"calc(100vh - 21rem)"}
                top={"60%"}
              />
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotFreeGames;
