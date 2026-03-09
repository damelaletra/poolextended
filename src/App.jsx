import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Remixes from './pages/Remixes';
import Premium from './pages/Premium';
import DJs from './pages/DJs';
import DJProfile from './pages/DJProfile';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardLayout from './components/DashboardLayout';
import DashboardIndex from './pages/dashboard/DashboardIndex';
import Archivos from './pages/dashboard/Archivos';
import Resumen from './pages/dashboard/Resumen';
import Categorias from './pages/dashboard/Categorias';
import Usuarios from './pages/dashboard/Usuarios';
import { PlayerProvider } from './contexts/PlayerContext';

function App() {
  return (
    <PlayerProvider>
      <BrowserRouter>
        <Layout>
           <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/remixes" element={<Remixes />} />
              <Route path="/djs" element={<DJs />} />
              <Route path="/dj/:id" element={<DJProfile />} />
              <Route path="/premium" element={<Premium />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Dashboard Layout and Routes */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardIndex />} />
                <Route path="resumen" element={<Resumen />} />
                <Route path="categorias" element={<Categorias />} />
                <Route path="archivos" element={<Archivos />} />
                <Route path="usuarios" element={<Usuarios />} />
              </Route>
           </Routes>
        </Layout>
      </BrowserRouter>
    </PlayerProvider>
  );
}

export default App;
