import { Card } from "./Card";

import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  const cardsElement = cards?.map((card) => {
    return (
      <li key={card._id} className="elements__card">
        <Card
          card={card}
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          onCardDelete={onCardDelete}
        />
      </li>
    );
  });

  return (
    <>
      <section className="profile">
        <div className="profile__content">
          <div className="profile__avatar">
            <img
              src={currentUser.avatar}
              alt="Фото профиля"
              className="profile__avatar-image"
              onClick={onEditAvatar}
            />
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
            <h2 className="profile__description">{currentUser.about}</h2>
          </div>
        </div>
        <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="elements__grid">{cardsElement}</ul>
      </section>
    </>
  );
}
