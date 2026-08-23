import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./SignIn.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { isAuthenticated, signIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const destination = location.state?.from?.pathname || "/profile";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(destination, { replace: true });
    }
  }, [destination, isAuthenticated, navigate]);

  if (isAuthenticated) {
    return null;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!signIn(email, password)) {
      setError("Enter your email and password to continue.");
      return;
    }

    navigate(destination, { replace: true });
  }

  return (
    <main className="sign-in page-section container">
      <div className="sign-in__content">
        <p className="sign-in__eyebrow">Welcome back</p>
        <h1 className="sign-in__title">Sign in to your baker profile</h1>
        <p className="sign-in__description">
          Save recipes, track your bakes, and keep your sourdough journey in one
          place.
        </p>

        <form className="sign-in__form" onSubmit={handleSubmit}>
          <label className="sign-in__label" htmlFor="email">
            Email
          </label>
          <input
            className="sign-in__input"
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label className="sign-in__label" htmlFor="password">
            Password
          </label>
          <input
            className="sign-in__input"
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {error && (
            <p className="sign-in__error" role="alert">
              {error}
            </p>
          )}

          <button className="btn btn--primary sign-in__submit" type="submit">
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
}

export default SignIn;
