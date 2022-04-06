import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { PusherProvider } from "@harelpls/use-pusher";
import config from "./pusher/config";

ReactDOM.render(
  <React.StrictMode>
    <PusherProvider {...config}>
      <App />
    </PusherProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
