<<<<<<< HEAD
import React, { useEffect } from 'react';
=======
>>>>>>> 640ee22f845a448bd6551a21e161878272fe9d55
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login'
import Home from './Pages/Home';
import Procedimentos from './Pages/Procedimentos';
import Voucher from './Pages/Voucher';
import Register from './Pages/Register';
import Perfil from './Pages/Perfil';
import CadastroMensagem from './Pages/CadastroMensagem';
import Sobre from './Components/Sobre';
import Servicos from './Pages/Servicos';
import VisualizarAgendamentos from './Pages/VisualizarAgendamentos';
import Agendamento from './Pages/Agendamento';
import { PrimeReactProvider } from 'primereact/api';
<<<<<<< HEAD
import AgendamentoForm from './Pages/CadastroDeHorarios';
=======
>>>>>>> 640ee22f845a448bd6551a21e161878272fe9d55

function App() {


  const status = localStorage.getItem('status');

  const value = {
    cssTransition: false,
  };

  return (
    <PrimeReactProvider value={value}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/procedimentos" element={status === 'Admin' ? <Procedimentos /> : <Home />} />
          <Route path="/voucher" element={status === 'Admin' ? <Voucher /> : <Home />} />
          <Route path="/cadastroMensagens" element={status === 'Admin' ? <CadastroMensagem /> : <Home />} />
          <Route path="/visualizarAgendamentos" element={status === 'Admin' ? <VisualizarAgendamentos /> : <Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/servicos" element={(status === 'Usuario' || status === 'Admin') ? <Servicos /> : <Home />} />
          <Route path="/agendamentos" element={(status === 'Usuario' || status === 'Admin') ? <Agendamento /> : <Home />} />
<<<<<<< HEAD
          <Route path="/cadastroHorarios" element={(status === 'Usuario' || status === 'Admin') ? <AgendamentoForm /> : <Home />} />
=======
>>>>>>> 640ee22f845a448bd6551a21e161878272fe9d55
          <Route path="/perfil" element={(status !== null ? <Perfil /> : <Register />)} />
        </Routes>
      </BrowserRouter>
    </PrimeReactProvider>
  );
}

export default App;