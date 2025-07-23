import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { AuthProvider } from "./UserContext.jsx";

import "./index.css";

import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Show from "./pages/Show.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Home from "./pages/Home.jsx";
import Update from "./pages/Update.jsx";
import Create from "./pages/Create.jsx";
import Destroy from "./pages/Destroy.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <StrictMode>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/" element={<Home />} />
          <Route path="/show/:id" element={<Show />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/update/:id" element={<Update />} />
          <Route path="/create" element={<Create />} />
          <Route path="/destroy/:id" element={<Destroy />} />

        </Routes>
      </StrictMode>
    </AuthProvider>
  </BrowserRouter>
);
