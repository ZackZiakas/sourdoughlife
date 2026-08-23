import "./Header.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function Header() {
  const { isAuthenticated, signOut } = useAuth();

  return (
    <header className="header">
      <div className="header__container container">
        <a href="/" className="header__brand">
          <span className="header__logo">🥖</span>
          <div>
            <p className="header__name">SourdoughLife</p>
            <p className="header__tagline">Helping Every Baker Rise.</p>
          </div>
        </a>

        <div className="header__actions">
          {isAuthenticated ? (
            <button
              className="header__button header__button_secondary"
              type="button"
              onClick={signOut}
            >
              Sign Out
            </button>
          ) : (
            <Link
              className="header__button header__button_secondary"
              to="/sign-in"
            >
              Sign In
            </Link>
          )}
          <Link className="header__button" to="/onboarding">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
