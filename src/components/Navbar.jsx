import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Hover3DLogo from './Hover3DLogo';
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
    <nav className="mobile-nav-pad" style={{ padding: '24px 48px', position: 'fixed', top: 0, width: '100%', zIndex: 10 }}>
      <div className="glass-panel mobile-nav-container" style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '12px 32px', borderRadius: '50px', maxWidth: '1400px', margin: '0 auto',
        position: 'relative', overflow: 'hidden'
      }}>
        <BorderBeam duration={6} size={400} borderWidth={2} colorFrom="#ccff00" colorTo="#00e5ff" delay={0} />
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'block' }}>
            <Hover3DLogo src="/logo.png" height="40px" />
          </Link>
        </div>
        <div className="mobile-nav-links" style={{ display: 'flex', gap: '40px', position: 'relative', zIndex: 1 }}>
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
        <div style={{ display: 'flex', gap: '12px', position: 'relative', zIndex: 1 }}>
          <button className="btn-glass mobile-hide" style={{ border: 'none', background: 'transparent', padding: '8px 16px' }}>Iniciar Sesión</button>
          <button className="btn-glass btn-accent" style={{ padding: '8px 20px' }}>Registrarse</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
