
import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header";

import Home from "./pages/Home";
import DishPage from "./pages/DishPage";
import SuggesterPage from "./pages/SuggesterPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";



const hideHeaderRoutes = ['/login', '/signup'];

function AppRoutes() {
  const location = useLocation();
  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dish/:id" element={<DishPage />} />
        <Route path="/suggester" element={<SuggesterPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

const App = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default App;