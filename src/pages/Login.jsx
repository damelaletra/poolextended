import React from 'react';

const Login = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh', padding: '40px 20px' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '40px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '24px' }}>Iniciar Sesión</h1>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#9ca3af' }}>Email</label>
            <input type="email" placeholder="dj@example.com" style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#9ca3af' }}>Contraseña</label>
            <input type="password" placeholder="••••••••" style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
          </div>
          <button className="btn-accent" style={{ padding: '14px', borderRadius: '8px', marginTop: '16px', fontWeight: 'bold' }}>
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
