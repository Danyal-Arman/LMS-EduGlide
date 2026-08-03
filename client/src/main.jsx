import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { appStore } from "./app/store";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { Toaster } from "./components/ui/sonner";
import ThemeProvider from "./context/themeContext";
import ErrorBoundary from "./components/ErrorBoundary";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={appStore}>
      <ThemeProvider>
        <ErrorBoundary>
          <App />
          <Toaster />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);