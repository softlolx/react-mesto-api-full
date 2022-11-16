import { PopupWithForm } from "./PopupWithForm";
import { Popup } from "./Popup";
import { useState, useEffect } from "react";
import { useFormValidation } from "../utils/useFormValidation";

export function AddPlacePopup({ onClose, onAddCard, isPending, isOpen }) {
  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormValidation();
  useEffect(() => {
    resetForm();
  }, []);

  // const [cardName, setCardName] = useState("");
  // const [cardLink, setCardLink] = useState("");

  // function handleChangeCardName(evt) {
  //   setCardName(evt.target.value);
  // }

  // function handleChangeCardLink(evt) {
  //   setCardLink(evt.target.value);
  // }

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddCard({
      name: values.name,
      link: values.link,
    });
  }

  return (
    <Popup name="add-card" isOpen={isOpen} onClose={onClose}>
      <PopupWithForm
        title="Новое место"
        name="add-card"
        buttonText="Сохранить"
        onClose={onClose}
        onSubmit={handleSubmit}
        isPending={isPending}
        isValid={isValid}
      >
        <input
          type="text"
          className="popup__input popup__input_type_card-name"
          name="name"
          required
          minLength="2"
          maxLength="30"
          placeholder="Название"
          id="card-name-input"
          value={values.name || ""}
          onChange={handleChange}
        />
        <span
          className={`${"popup__error"} ${isValid ? "" : "popup__error_visible"}`}
          id="email-input-error"
        >
          {errors.name}
        </span>
        <input
          type="url"
          className="popup__input popup__input_type_card-link"
          name="link"
          required
          placeholder="Ссылка на картинку"
          id="card-url-input"
          value={values.link || ""}
          onChange={handleChange}
        />
        <span
          className={`${"popup__error"} ${isValid ? "" : "popup__error_visible"}`}
          id="email-input-error"
        >
          {errors.link}
        </span>
      </PopupWithForm>
    </Popup>
  );
}
