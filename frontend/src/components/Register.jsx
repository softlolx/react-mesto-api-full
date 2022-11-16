import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormValidation } from "../utils/useFormValidation";

export function Register({ isPending, onRegister }) {
  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormValidation();

  useEffect(() => {
    resetForm();
  }, []);

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(values.email, values.password);
  }

  return (
    <section className="auth">
      <form
        action="submit"
        className="auth-form"
        name="register"
        onSubmit={handleSubmit}
        noValidate
      >
        <h3 className="auth-form__title">Регистрация</h3>
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
          {isPending ? "Работаем..." : "Зарегистрироваться"}
        </button>
        <span className="auth-form__already-registered">
          Уже зарегистрированы?{" "}
          <Link to="/signin" className="auth-form__login-redirect">
            Войти
          </Link>
        </span>
      </form>
    </section>
  );
}
