import mainLogo from "../images/logo.svg";
import { Switch, Route, Link } from "react-router-dom";

export function Header({ isLoggedIn, userEmail, onSignOut }) {
  return (
    <header className="header">
      <img src={mainLogo} alt="Логотип Место Россия" className="header__logo" />
      {isLoggedIn ? (
        <div className="header__auth-container">
          <span className="header__user-email">{userEmail}</span>
          <button className="header__exit-button" onClick={() => onSignOut()}>
            Выйти
          </button>
        </div>
      ) : (
        <Switch>
          <Route path="/signin">
            <Link className="header__auth-redirect" to="/signup">
              Регистрация
            </Link>
          </Route>
          <Route path="/signup">
            <Link className="header__auth-redirect" to="/signin">
              Войти
            </Link>
          </Route>
        </Switch>
      )}
    </header>
  );
}
