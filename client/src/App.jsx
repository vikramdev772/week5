import React from "react";
import "./App.css";
import { Route, Routes,BrowserRouter } from "react-router-dom";
import L from "./ui/L";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import Use from "./auth/Use";
function App() {
  console.log(" Hello 🍎");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<L />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/use" element={<Use />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
