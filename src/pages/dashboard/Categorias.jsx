import React from 'react';
import '../../components/DashboardLayout.css';

const Categorias = () => {
  return (
    <div className="dashboard-header">
      <span className="breadcrumb">Escritorio &gt; Categorías</span>
      <h1>Mis Categorías</h1>
      
      <div className="glass-panel" style={{ padding: '30px', marginTop: '30px' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <li style={{ padding: '15px 30px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>Cubaton</li>
          <li style={{ padding: '15px 30px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>Reggaeton</li>
          <li style={{ padding: '15px 30px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>House Video</li>
          <li style={{ padding: '15px 30px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', color: 'var(--accent-color)', borderColor: 'var(--accent-color)' }}>+ Solicitar Categoría</li>
        </ul>
      </div>
    </div>
  );
};

export default Categorias;
