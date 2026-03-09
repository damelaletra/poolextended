import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, FileText, LayoutGrid, Music, Users } from 'lucide-react';
import './DashboardLayout.css';

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      {/* Sidebar Privado */}
      <aside className="dashboard-sidebar glass-panel">
        <div className="sidebar-brand">
          <img src="/logo.png" alt="Pool Extended" style={{ height: '30px', objectFit: 'contain' }} />
        </div>
        
        <nav className="sidebar-nav">
          <NavLink to="/dashboard" end className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <LayoutDashboard size={20} />
            <span>Escritorio</span>
          </NavLink>
          <NavLink to="/dashboard/resumen" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <FileText size={20} />
            <span>Resumen</span>
          </NavLink>
          <NavLink to="/dashboard/categorias" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <LayoutGrid size={20} />
            <span>Categorías</span>
          </NavLink>
          <NavLink to="/dashboard/archivos" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <Music size={20} />
            <span>Archivos</span>
          </NavLink>
          <NavLink to="/dashboard/usuarios" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <Users size={20} />
            <span>Usuarios</span>
          </NavLink>
        </nav>
      </aside>

      {/* Contenido Principal */}
      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
