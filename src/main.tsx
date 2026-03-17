import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "@/entities/store";
import { AppRouter } from "@/app/router";
import { SessionRestore } from "@/app/providers/SessionRestore";
import { Toaster } from "@/shared/ui/sonner";
import "@/shared/assets/styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <SessionRestore>
        <AppRouter />
        <Toaster />
      </SessionRestore>
    </Provider>
  </React.StrictMode>,
);
