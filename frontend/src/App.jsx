import React from "react";
import { BrowserRouter,Route, Routes } from "react-router-dom";
import Login from "./Login";
import Fullpage from "./FullPage";
const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Fullpage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
          
        
    
  );
};

export default App;
