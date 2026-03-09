import React from 'react';
import '../../components/DashboardLayout.css';

const Resumen = () => {
  return (
    <div className="dashboard-header">
      <span className="breadcrumb">Escritorio &gt; Resumen</span>
      <h1>Resumen de Cuenta</h1>
      <p style={{ marginTop: '10px' }}>Vista detallada del resumen financiero y de analíticas (Próximamente).</p>
      
      <div className="glass-panel" style={{ padding: '40px', marginTop: '30px', textAlign: 'center', color: '#9ca3af' }}>
        <h2>Sin datos suficientes</h2>
        <p>Comienza a subir tus aportes para generar estadísticas avanzadas.</p>
      </div>
    </div>
  );
};

export default Resumen;
