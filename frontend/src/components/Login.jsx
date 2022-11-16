import { useEffect } from "react";
import { useFormValidation } from "../utils/useFormValidation";

export function Login({ isPending, onLogIn }) {
  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormValidation();

  useEffect(() => {
    resetForm();
  }, []);

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogIn(values.email, values.password);
  }

  return (
    <section className="auth">
      <form action="submit" className="auth-form" name="login" onSubmit={handleSubmit} noValidate>
        <h3 className="auth-form__title">Вход</h3>
        <input
          type="email"
          className="auth-form__input"
          minLength="5"
          name="email"
          required
          placeholder="Email"
          id="email-input"
          value={values.email || ""}
          onChange={handleChange}
        />
        <span
          className={`${"popup__error"} ${isValid ? "" : "popup__error_visible"}`}
          id="email-input-error"
        >
          {errors.email}
        </span>
        <input
          type="password"
          className="auth-form__input"
          name="password"
          required
          minLength="8"
          maxLength="16"
          placeholder="Пароль"
          id="password-input"
          value={values.password || ""}
          onChange={handleChange}
        />
        <span
          className={`${"popup__error"} ${isValid ? "" : "popup__error_visible"}`}
          id="email-input-error"
        >
          {errors.password}
        </span>
        <button type="submit" className="auth-form__submit-button" disabled={!isValid}>
          {isPending ? "Работаем..." : "Войти"}
        </button>
      </form>
    </section>
  );
}
