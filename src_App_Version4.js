import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Importacao from "./pages/Importacao";
import Repasses from "./pages/Repasses";
import Sidebar from "./components/Sidebar";
import { Box, Toolbar } from "@mui/material";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/*"
        element={
          <Box sx={{ display: "flex" }}>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Toolbar />
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/importacao" element={<Importacao />} />
                <Route path="/repasses" element={<Repasses />} />
              </Routes>
            </Box>
          </Box>
        }
      />
    </Routes>
  );
}