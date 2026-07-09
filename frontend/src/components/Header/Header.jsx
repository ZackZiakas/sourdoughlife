import "./Header.css";

function Header() {
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
          <button className="header__button header__button_secondary">
            Sign In
          </button>
          <button className="header__button">Get Started</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
