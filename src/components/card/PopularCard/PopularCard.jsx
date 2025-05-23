import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./PopularCard.scss";
import "../../../scss/common.scss";
import appleIcon from "../../../assets/images/icon-apple.png";
import androidIcon from "../../../assets/images/icon-android.png";

const PopularCard = ({
  id,
  title,
  image,
  // buttonText,
  className = "",
  children,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div
      className={`card-popular ${className}`}
      onClick={() => navigate(`/game?id=${id}`)}
    >
      <figure className="card-popular__image-container">
        {image ? (
          <img
            src={image}
            alt={t(title)}
            className="card-popular__image"
            loading="lazy"
          />
        ) : (
          <div className="card-popular__image skeleton" />
        )}
      </figure>
      <div className="card-popular__content">
        <p className="card-popular__title">{t(title)}</p>
        {children}
        {/* {buttonText && id && (
          <Link to={`/game?id=${id}`} className="btn--play">
            {t(buttonText)}
          </Link>
        )} */}
        <div className="platform-btns">
          <Link to={`/game?id=${id}`} className="btn--platform">
            <img
              src={androidIcon}
              alt="android icon"
              className="platform-btns__img"
            />
          </Link>
          <Link to={`/game?id=${id}`} className="btn--platform">
            <img
              src={appleIcon}
              alt="apple icon"
              className="platform-btns__img"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

PopularCard.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  image: PropTypes.string,
  buttonText: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default PopularCard;

//API DEMO
// const [cardData, setCardData] = React.useState([]);
// React.useEffect(() => {
//   fetch("https://example.com/api/cards")
//     .then((response) => response.json())
//     .then((data) => setCardData(data));
// }, []);
