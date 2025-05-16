import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import cardHotData from "./cardHotData";
import PopularCard from "../../../components/card/PopularCard/PopularCard";
import NotFound from "../../../components/common/NotFound/NotFound";
import titleLeft from "../../../assets/images/title-left.png";
import "./HotFreeGames.scss";

const HotFreeGames = () => {
  const { t } = useTranslation();

  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

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

      {/* 手機版篩選按鈕 */}
      <div className="hot-games__mobile-filter-btn">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="btn--filter"
        >
          篩選條件
        </button>
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
                  <span className="label-text">
                    {["rpg", "action", "card", "openWorld"].includes(tag)
                      ? t(`tags.${tag}`)
                      : tag}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* 過濾後的卡片 */}
        <div className="hot-games__grid">
          <AnimatePresence>
            {filteredCards.length > 0 ? (
              filteredCards.map((card) => (
                <motion.div
                  key={card.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <PopularCard {...card} />
                </motion.div>
              ))
            ) : (
              <motion.div
                key="notfound"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <NotFound message={t("hot.no-results")} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 手機版篩選 */}

      <AnimatePresence>
        {isMobileFilterOpen && (
          <motion.div
            className="hot-games__mobile-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="hot-games__mobile-modal-content"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
            >
              <div className="hot-games__mobile-modal-header">
                <h2 className="hot-games__filter-title">篩選條件</h2>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="btn--cancel"
                >
                  ✕
                </button>
              </div>

              {/* 裝置篩選 */}
              <div className="hot-games__filter">
                <h3 className="hot-games__filter-subtitle">
                  {t("hot.filter-platform")}
                </h3>
                <div className="hot-games__filter-options">
                  {allPlatforms.map((platform) => (
                    <label
                      key={platform}
                      className={`filter-option ${
                        selectedPlatforms.includes(platform) ? "selected" : ""
                      }`}
                    >
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

              {/* 類型篩選 */}
              <div className="hot-games__filter">
                <h3 className="hot-games__filter-subtitle">
                  {t("hot.filter-genre")}
                </h3>
                <div className="hot-games__filter-options">
                  {allTags.map((tag) => (
                    <label
                      key={tag}
                      className={`filter-option ${
                        selectedTags.includes(tag) ? "selected" : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag)}
                        onChange={() => handleTagClick(tag)}
                      />
                      <span className="checkbox-icon" />
                      <span className="label-text">
                        {["rpg", "action", "card", "openWorld"].includes(tag)
                          ? t(`tags.${tag}`)
                          : tag}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HotFreeGames;
