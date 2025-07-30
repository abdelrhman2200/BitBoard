import React from "react";
import ReactDOM from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HashRouter, HashRouter as Router } from 'react-router-dom';
import { BrowserRouter } from "react-router-dom";
import CoinContextProvider from "./context/CoinContext.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter basename="/BitBoard">
      <CoinContextProvider>
        <App />
      </CoinContextProvider>
    </HashRouter>
  </StrictMode>,
);
