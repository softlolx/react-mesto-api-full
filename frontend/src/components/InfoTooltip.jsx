import failImg from "../images/failImg.svg";
import successImg from "../images/successImg.svg";

export function InfoTooltip({ isError, onClose }) {
  return (
    <div className="popup_content_infotooltip">
      <img
        src={isError ? failImg : successImg}
        alt={
          isError ? "Что-то пошло не так! Попробуйте ещё раз." : "Вы успешно зарегистрировались!"
        }
        className="popup__info-image"
      />
      <p className="popup__info-message">
        {isError ? "Что-то пошло не так! Попробуйте ещё раз." : "Вы успешно зарегистрировались!"}
      </p>

      <button type="button" className="popup__close-button" onClick={onClose}></button>
    </div>
  );
}
