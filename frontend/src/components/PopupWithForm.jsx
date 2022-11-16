export function PopupWithForm({
  title,
  name,
  children,
  buttonText,
  onClose,
  onSubmit,
  isPending,
  isValid,
}) {
  return (
    <div className={`popup__container popup__container_type_${name}`}>
      <h3 className="popup__title">{title}</h3>
      <form
        name={name}
        action="#"
        className={`popup__form popup__form_content_${name}`}
        onSubmit={onSubmit}
        noValidate
      >
        {children}
        <button type="submit" className="popup__submit-button" disabled={!isValid}>
          {isPending ? "Работаем..." : buttonText}
        </button>
      </form>
      <button type="button" className="popup__close-button" onClick={onClose}></button>
    </div>
  );
}
