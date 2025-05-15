import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Layout from "./components/layout/Layout/Layout";
import AgeGateModal from "./components/common/AgeGateModal/AgeGateModal";
import GoTopButton from "./components/common/GoTopButton/GoTopButton";
import HotFreeGames from "./pages/game/HotFreeGames/HotFreeGames";

function App() {
  return (
    <BrowserRouter>
      <AgeGateModal />
      <GoTopButton />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="games" element={<HotFreeGames />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
