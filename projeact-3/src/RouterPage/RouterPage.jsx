import React from "react";
import { Route, Routes } from "react-router-dom";

import UseInterfacePage from "../Components/UserInterfacePage";
import Login from "../Components/Login+Resigter/Login";
import Resigter from "../Components/Login+Resigter/Resigter";
import HomePage from "../Components/HomePage";
import Navbars from "../Components/Navbars/Navbars";
import { useAuth } from "../Components/auth-context";

function RouterPage() {
  const { user } = useAuth();
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/resigter" element={<Resigter />}></Route>
        <Route path="/" element={<UseInterfacePage />}></Route>
        <Route path="/homepage" element={<HomePage />}></Route>
      </Routes>
    </div>
  );
}

export default RouterPage;
