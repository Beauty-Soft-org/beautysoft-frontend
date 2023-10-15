import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login'
import Home from './Pages/Home';
import Procedimentos from './Pages/Procedimentos';
import Voucher from './Pages/Voucher';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/procedimentos" element={<Procedimentos />} />
        <Route path="/voucher" element={<Voucher />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;