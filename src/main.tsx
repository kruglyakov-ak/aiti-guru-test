import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { AppRouter } from "./app/router";
import { SessionRestore } from "./app/providers/SessionRestore";
import "@/shared/assets/styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <SessionRestore>
        <AppRouter />
      </SessionRestore>
    </Provider>
  </React.StrictMode>,
);
