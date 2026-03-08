import React, { useEffect, useState } from 'react';
import { usePlayer } from '../contexts/PlayerContext';
import { motion, AnimatePresence } from 'framer-motion';

const CoverFlow = ({ tracks, onClose }) => {
  const { currentTrack, setCurrentTrack } = usePlayer();
  const [activeIndex, setActiveIndex] = useState(0);

  // Sincronizar el track actual con el índice
  useEffect(() => {
    if (currentTrack) {
      const idx = tracks.findIndex(t => t.id === currentTrack.id);
      if (idx !== -1) setActiveIndex(idx);
    }
  }, [currentTrack, tracks]);

  // Teclado para navegar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        const nextIdx = Math.min(activeIndex + 1, tracks.length - 1);
        setActiveIndex(nextIdx);
        setCurrentTrack(tracks[nextIdx]);
      } else if (e.key === 'ArrowLeft') {
        const prevIdx = Math.max(activeIndex - 1, 0);
        setActiveIndex(prevIdx);
        setCurrentTrack(tracks[prevIdx]);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, tracks, setCurrentTrack, onClose]);

  const handleCardClick = (idx, track) => {
    setActiveIndex(idx);
    setCurrentTrack(track);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
        zIndex: 50, display: 'flex', flexDirection: 'column', 
        justifyContent: 'center', alignItems: 'center',
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)'
      }}
    >
      {/* Botón Cerrar */}
      <button 
        onClick={onClose}
        style={{
          position: 'absolute', top: '40px', right: '40px', background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '50%',
          width: '50px', height: '50px', fontSize: '1.5rem', cursor: 'pointer', zIndex: 60,
          display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'all 0.3s'
        }}
        onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
        onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
      >
        ✕
      </button>

      {/* Carrusel 3D */}
      <div style={{ 
        position: 'relative', height: '500px', display: 'flex', justifyContent: 'center', 
        alignItems: 'center', perspective: '1200px', width: '100%'
      }}>
        {tracks.map((track, idx) => {
          const isActive = idx === activeIndex;
          
          let transform = 'translateZ(-400px) scale(0.5)';
          let opacity = 0;
          let zIndex = 0;
          let filter = 'blur(10px) brightness(0.5)';

          if (isActive) {
            transform = 'translateZ(100px) scale(1.1)';
            opacity = 1;
            zIndex = 10;
            filter = 'blur(0px) brightness(1)';
          } else if (idx === activeIndex - 1) {
            transform = 'translateX(-300px) translateZ(-100px) rotateY(20deg) scale(0.8)';
            zIndex = 5;
            opacity = 0.8;
            filter = 'blur(2px) brightness(0.7)';
          } else if (idx === activeIndex + 1) {
            transform = 'translateX(300px) translateZ(-100px) rotateY(-20deg) scale(0.8)';
            zIndex = 5;
            opacity = 0.8;
            filter = 'blur(2px) brightness(0.7)';
          } else if (idx === activeIndex - 2) {
            transform = 'translateX(-500px) translateZ(-250px) rotateY(35deg) scale(0.6)';
            zIndex = 2;
            opacity = 0.5;
            filter = 'blur(5px) brightness(0.4)';
          } else if (idx === activeIndex + 2) {
            transform = 'translateX(500px) translateZ(-250px) rotateY(-35deg) scale(0.6)';
            zIndex = 2;
            opacity = 0.5;
            filter = 'blur(5px) brightness(0.4)';
          }

          return (
            <div 
              key={track.id} 
              onClick={() => handleCardClick(idx, track)}
              style={{ 
                position: 'absolute',
                width: '320px',
                height: '400px',
                transform,
                opacity,
                zIndex,
                filter,
                cursor: isActive ? 'default' : 'pointer',
                transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                boxShadow: isActive ? '0 30px 60px rgba(0,0,0,0.8)' : 'var(--glass-shadow)',
                pointerEvents: opacity === 0 ? 'none' : 'auto',
                borderRadius: '24px',
                overflow: 'hidden',
                background: 'var(--glass-bg)',
                border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <img src={track.img} alt={track.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              
              {/* Overlay inferior con la info de la canción, similar a la foto del usuario */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, width: '100%', 
                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)',
                padding: '40px 20px 20px 20px', textAlign: 'center',
                transition: 'opacity 0.4s',
                opacity: isActive ? 1 : 0
              }}>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '1.4rem', fontWeight: 700, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{track.title}</h3>
                <p style={{ margin: 0, color: 'rgba(255,255,255,0.7)', fontSize: '1rem' }}>{track.dj}</p>
              </div>
            </div>
          )
        })}
      </div>
    </motion.div>
  );
};

export default CoverFlow;
