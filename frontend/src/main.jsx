import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./contexts/AuthContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { BakeLogProvider } from "./contexts/BakeLogContext";
import { CommunityProvider } from "./contexts/CommunityContext";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <FavoritesProvider>
        <BakeLogProvider>
          <CommunityProvider>
            <App />
          </CommunityProvider>
        </BakeLogProvider>
      </FavoritesProvider>
    </AuthProvider>
  </StrictMode>,
);
