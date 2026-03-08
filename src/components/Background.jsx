import React from 'react';

const Background = () => {
  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: -1,
        background: '#0b0914'
      }}
    >
      <div 
        className="orb orb-1" 
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'var(--bg-shape-1)',
          top: '-100px',
          left: '-200px',
          opacity: 0.5,
          filter: 'blur(120px)',
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)' // Force GPU
        }}
      />
      <div 
        className="orb orb-2" 
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'var(--bg-shape-2)',
          bottom: '-100px',
          right: '-100px',
          opacity: 0.4,
          filter: 'blur(120px)',
          willChange: 'transform',
          animationDelay: '-5s',
          transform: 'translate3d(0, 0, 0)'
        }}
      />
      <div 
        className="orb orb-3" 
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'var(--bg-shape-3)',
          top: '30%',
          left: '40%',
          opacity: 0.35,
          filter: 'blur(140px)',
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)'
        }}
      />
    </div>
  );
};

export default Background;
