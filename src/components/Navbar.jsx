import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BorderBeam } from './BorderBeam';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Remixes', path: '/remixes' },
    { name: 'DJs', path: '/djs' },
    { name: 'Premium', path: '/premium' },
  ];

  return (
    <nav style={{ padding: '24px 48px', position: 'fixed', top: 0, width: '100%', zIndex: 10 }}>
      <div className="glass-panel" style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '12px 32px', borderRadius: '50px', maxWidth: '1400px', margin: '0 auto',
        position: 'relative', overflow: 'hidden'
      }}>
        <BorderBeam duration={6} size={400} borderWidth={2} colorFrom="#ccff00" colorTo="#00e5ff" delay={0} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/logo.png" alt="Logo" style={{ height: '40px', objectFit: 'contain' }} />
          </Link>
        </div>
        <div style={{ display: 'flex', gap: '40px', position: 'relative', zIndex: 1 }}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.path}
                to={link.path} 
                style={{ 
                  color: isActive ? 'white' : 'var(--text-secondary)', 
                  textDecoration: 'none', 
                  fontWeight: 500, 
                  transition: 'color 0.2s',
                  borderBottom: isActive ? '2px solid var(--accent-color)' : 'none',
                  paddingBottom: isActive ? '4px' : '0px'
                }}
                onMouseOver={e => e.target.style.color='white'} 
                onMouseOut={e => {
                  if (!isActive) e.target.style.color='var(--text-secondary)'
                }}
              >
                {link.name}
              </Link>
            )
          })}
        </div>
        <div style={{ display: 'flex', gap: '16px', position: 'relative', zIndex: 1 }}>
          <button className="btn-glass" style={{ border: 'none', background: 'transparent' }}>Iniciar Sesión</button>
          <button className="btn-glass btn-accent">Registrarse</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
