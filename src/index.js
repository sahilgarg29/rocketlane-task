import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { PusherProvider } from "@harelpls/use-pusher";
import config from "./pusher/config";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <PusherProvider {...config}>
      <App />
    </PusherProvider>
  </React.StrictMode>
);
