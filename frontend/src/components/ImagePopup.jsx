import imgUnavailable from "../images/imgUnavailable.jpg";

export function ImagePopup({ card, onClose }) {
  return (
    card && (
      <figure className="popup__figure">
        <img
          src={card.link}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = imgUnavailable;
          }}
          alt={card.name}
          className="popup__image"
        />
        <figcaption className="popup__image-caption">{card.name}</figcaption>
        <button type="button" className="popup__close-button" onClick={onClose}></button>
      </figure>
    )
  );
}
