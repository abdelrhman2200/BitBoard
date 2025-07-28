import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Coins from "./pages/Coins/Coins";
import CoinDetails from "./pages/CoinDetails/CoinDetails.jsx";
import Calculator from "./pages/Calculator/Calculator";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coins" element={<Coins />} />
        <Route path="/coin/:id" element={<CoinDetails />} />
        <Route path="/calculator" element={<Calculator />} />
      </Routes>
    </div>
  );
};

export default App;
