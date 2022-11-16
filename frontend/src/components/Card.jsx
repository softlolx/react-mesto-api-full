import imgUnavailable from "../images/imgUnavailable.jpg";

import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  function handleCardClick() {
    onCardClick(card);
  }

  function handleCardLike() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }
  return (
    <>
      {isOwn ? (
        <button className="elements__card-delete-button" onClick={handleCardDelete}></button>
      ) : null}
      <img
        src={card.link}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = imgUnavailable;
        }}
        alt={card.name}
        className="elements__card-img"
        onClick={handleCardClick}
      />
      <div className="elements__card-description">
        <h3 className="elements__card-title">{card.name}</h3>
        <div className="elements__card-like-container">
          <button
            type="button"
            className={`elements__card-like-button ${
              isLiked ? "elements__card-like-button_active" : ""
            }`}
            onClick={handleCardLike}
          ></button>
          <p className="elements__card-like-counter">{card.likes.length}</p>
        </div>
      </div>
    </>
  );
}
