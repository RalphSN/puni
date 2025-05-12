import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Layout from "./components/layout/Layout/Layout";
import AgeGateModal from "./components/common/AgeGateModal/AgeGateModal";

function App() {
  return (
    <BrowserRouter>
      <AgeGateModal />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
