import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__container container">
        <NavLink to="/" className="navbar__link">
          Home
        </NavLink>
        <NavLink to="/recipes" className="navbar__link">
          Recipes
        </NavLink>
        <NavLink to="/bake-log" className="navbar__link">
          Bake Log
        </NavLink>
        <NavLink to="/community" className="navbar__link">
          Community
        </NavLink>
        <NavLink to="/profile" className="navbar__link">
          Profile
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
