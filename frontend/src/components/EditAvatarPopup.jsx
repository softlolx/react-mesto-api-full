import { useEffect } from "react";
import { Popup } from "./Popup";
import { PopupWithForm } from "./PopupWithForm";
import { useFormValidation } from "../utils/useFormValidation";

export function EditAvatarPopup({ onClose, onUpdateAvatar, isPending, isOpen }) {
  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormValidation();

  useEffect(() => {
    resetForm();
  }, []);

  function onSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({ avatar: values.avatar });
  }

  return (
    <Popup name="avatar" isOpen={isOpen} onClose={onClose}>
      <PopupWithForm
        title="Обновить аватар"
        name="avatar"
        buttonText="Сохранить"
        onClose={onClose}
        onSubmit={onSubmit}
        isPending={isPending}
        isValid={isValid}
      >
        <input
          type="url"
          className="popup__input popup__input_type_avatar"
          name="avatar"
          required
          minLength="2"
          maxLength="200"
          placeholder="Ссылка на аватар"
          id="avatar-input"
          onChange={handleChange}
        />
        <span
          className={`${"popup__error"} ${isValid ? "" : "popup__error_visible"}`}
          id="email-input-error"
        >
          {errors.avatar}
        </span>
      </PopupWithForm>
    </Popup>
  );
}
