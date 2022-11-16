import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Popup } from "./Popup";
import { PopupWithForm } from "./PopupWithForm";
import { useFormValidation } from "../utils/useFormValidation";

export function EditProfilePopup({ onClose, onUpdateUser, isPending, isOpen }) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormValidation();

  useEffect(() => {
    if (currentUser) {
      resetForm();
      setValues(currentUser);
    }
  }, [currentUser, isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }

  return (
    <Popup name="profile" isOpen={isOpen} onClose={onClose}>
      <PopupWithForm
        title="Редактировать профиль"
        name="profile"
        buttonText="Сохранить"
        onClose={onClose}
        onSubmit={handleSubmit}
        isPending={isPending}
        isValid={isValid}
      >
        <input
          type="text"
          className="popup__input popup__input_type_name"
          name="name"
          required
          minLength="2"
          maxLength="40"
          placeholder="Имя"
          id="name-input"
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
          type="text"
          className="popup__input popup__input_type_description"
          name="about"
          required
          minLength="2"
          maxLength="200"
          placeholder="О себе"
          id="about-input"
          value={values.about || ""}
          onChange={handleChange}
        />
        <span
          className={`${"popup__error"} ${isValid ? "" : "popup__error_visible"}`}
          id="email-input-error"
        >
          {errors.about}
        </span>
      </PopupWithForm>
    </Popup>
  );
}
