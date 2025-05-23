import { useState, useEffect, useRef } from "react";
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
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false);
  const [platformDropdownOpen, setPlatformDropdownOpen] = useState(false);
  const platformDropdownRef = useRef(null);
  const tagDropdownRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        platformDropdownRef.current &&
        !platformDropdownRef.current.contains(event.target)
      ) {
        setPlatformDropdownOpen(false);
      }
      if (
        tagDropdownRef.current &&
        !tagDropdownRef.current.contains(event.target)
      ) {
        setTagDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

      {/* 手機版下拉式篩選器 */}
      <div className="hot-games__dropdowns">
        {/* 裝置類型下拉選單 */}
        <div className="dropdown" ref={platformDropdownRef}>
          <button
            className="type-selector"
            onClick={() => setPlatformDropdownOpen((prev) => !prev)}
          >
            {t("hot.filter-platform")}
          </button>
          <AnimatePresence>
            {platformDropdownOpen && (
              <motion.div
                className="dropdown-menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AnimatePresence>
                  {allPlatforms.map((platform) => (
                    <motion.label
                      key={platform}
                      className="filter-option"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.15 }}
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
                    </motion.label>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 類型下拉選單 */}
        <div className="dropdown" ref={tagDropdownRef}>
          <button
            className="type-selector"
            onClick={() => setTagDropdownOpen((prev) => !prev)}
          >
            {t("hot.filter-genre")}
          </button>
          <AnimatePresence>
            {tagDropdownOpen && (
              <motion.div
                className="dropdown-menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AnimatePresence>
                  {allTags.map((tag) => (
                    <motion.label
                      key={tag}
                      className="filter-option"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.15 }}
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
                    </motion.label>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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
    </section>
  );
};

export default HotFreeGames;
