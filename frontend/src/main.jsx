import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { BakeLogProvider } from "./contexts/BakeLogContext";
import { CommunityProvider } from "./contexts/CommunityContext";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FavoritesProvider>
      <BakeLogProvider>
        <CommunityProvider>
          <App />
        </CommunityProvider>
      </BakeLogProvider>
    </FavoritesProvider>
  </StrictMode>,
);
