import React from "react";
import { BrowserRouter,Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Fullpage from "./pages/FullPage";
import ItemPage from "./pages/ItemPage";
import WalletConnect from "./pages/WalletConnect";
const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Fullpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/items" element={<ItemPage />} />
          <Route path="/me/connect-wallet" element={<WalletConnect />} />
        </Routes>
      </BrowserRouter>
          
        
    
  );
};

export default App;
