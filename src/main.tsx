import React from "react";
import ReactDOM from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./i18n/config.ts";
import "./index.css";

document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <HeroUIProvider>
        <main>
          <App />
        </main>
      </HeroUIProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
