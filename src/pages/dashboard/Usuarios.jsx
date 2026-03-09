import React from 'react';
import '../../components/DashboardLayout.css';

const Usuarios = () => {
  return (
    <div className="dashboard-header">
      <span className="breadcrumb">Escritorio &gt; Usuarios</span>
      <h1>Gestión de Usuarios</h1>
      
      <div className="glass-panel" style={{ padding: '40px', marginTop: '30px', textAlign: 'center', color: '#9ca3af' }}>
        <h2>Acceso Denegado</h2>
        <p>Solo los administradores generales pueden ver y gestionar otros usuarios.</p>
        <button className="btn-accent" style={{ marginTop: '20px', padding: '10px 24px', borderRadius: '8px' }}>
          Volver al Escritorio
        </button>
      </div>
    </div>
  );
};

export default Usuarios;
