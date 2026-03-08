import React, { useState } from 'react';
import { usePlayer } from '../contexts/PlayerContext';
import { AnimatePresence } from 'framer-motion';
import CoverFlow from '../components/CoverFlow';

const Remixes = () => {
  const { currentTrack, setCurrentTrack } = usePlayer();
  const [isCoverFlowOpen, setIsCoverFlowOpen] = useState(false);

  const tracks = [
    { id: 10, title: "Summer Vibes Bootleg", dj: "DJ Snake", bpm: 128, genre: "EDM", img: "/covers/cover_gen_1.png", audioSrc: "/audio/cancion_prueba_1.mp3" },
    { id: 11, title: "Latin Flow 25", dj: "Orly Dj", bpm: 95, genre: "Reggaeton", img: "/covers/cover_gen_2.png", audioSrc: "/audio/cancion_prueba_2.mp3" },
    { id: 12, title: "Tech House Groove", dj: "David Krass DJ", bpm: 126, genre: "Tech House", img: "/covers/cover_gen_3.png", audioSrc: "/audio/cancion_prueba_3.mp3" },
    { id: 13, title: "Classic Rewind", dj: "Dj Franco", bpm: 105, genre: "Hip Hop", img: "/covers/cover_gen_4.png", audioSrc: "/audio/cancion_prueba_4.mp3" },
    { id: 14, title: "Dembow Puro", dj: "Dj Segura", bpm: 118, genre: "Dembow", img: "/covers/cover_gen_5.png", audioSrc: "/audio/cancion_prueba_5.mp3" },
    { id: 15, title: "Midnight Synthesis", dj: "Cyber Punk", bpm: 110, genre: "Synthwave", img: "/covers/cover_gen_1.png", audioSrc: "/audio/cancion_prueba_6.mp3" },
    { id: 16, title: "Afro Beats 2026", dj: "DJ Tuku", bpm: 108, genre: "Afrobeat", img: "/covers/cover_gen_2.png", audioSrc: "/audio/cancion_prueba_7.mp3" },
    { id: 17, title: "Deep House Set", dj: "Luiz", bpm: 122, genre: "House", img: "/covers/cover_gen_3.png", audioSrc: "/audio/cancion_prueba_8.mp3" },
    { id: 18, title: "Bumping Moombahton", dj: "Major L", bpm: 100, genre: "Moombahton", img: "/covers/cover_gen_4.png", audioSrc: "/audio/cancion_prueba_9.mp3" },
    { id: 19, title: "Trance State", dj: "Armin V", bpm: 138, genre: "Trance", img: "/covers/cover_gen_5.png", audioSrc: "/audio/cancion_prueba_10.mp3" },
  ];

  const handleTrackClick = (track) => {
    setCurrentTrack(track);
    setIsCoverFlowOpen(true);
  };

  return (
    <div style={{ marginTop: '40px' }}>
      
      <AnimatePresence>
        {isCoverFlowOpen && (
          <CoverFlow tracks={tracks} onClose={() => setIsCoverFlowOpen(false)} />
        )}
      </AnimatePresence>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '3rem', margin: '0 0 8px 0', fontWeight: 700 }}>CATÁLOGO DE REMIXES</h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '1.2rem' }}>Descubre las últimas pistas y ediciones exclusivas.</p>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <select className="glass-panel" style={{ background: 'rgba(255,255,255,0.05)', color: 'white', padding: '12px 24px', border: '1px solid var(--glass-border)', borderRadius: '12px', outline: 'none' }}>
            <option value="">Todos los Géneros</option>
            <option value="edm">EDM</option>
            <option value="reggaeton">Reggaeton</option>
          </select>
          <input 
            className="glass-panel"
            type="text" 
            placeholder="Buscar por nombre, dj, bpm..." 
            style={{ background: 'rgba(255,255,255,0.05)', color: 'white', padding: '12px 24px', border: '1px solid var(--glass-border)', borderRadius: '12px', outline: 'none', width: '300px' }} 
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {tracks.map((track, i) => {
          const isSelected = track.id === (currentTrack && currentTrack.id);

          return (
            <div key={track.id} 
              className={`glass-panel ${isSelected ? 'selected-track-card' : ''}`}
              style={{ 
                display: 'flex', 
                flexDirection: 'row',
                alignItems: 'center', 
                padding: '16px 24px', 
                borderRadius: '16px',
                transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)', 
                cursor: 'pointer',
                background: isSelected ? 'rgba(255, 255, 255, 0.1)' : 'var(--glass-bg)',
                transform: isSelected ? 'scale(1.02)' : 'none',
                boxShadow: isSelected ? '0 10px 30px rgba(0,0,0,0.5)' : 'var(--glass-shadow)',
                border: isSelected ? '1px solid rgba(255,255,255,0.2)' : '1px solid var(--glass-border)'
              }} 
              onClick={() => handleTrackClick(track)}
              onMouseOver={e => !isSelected && (e.currentTarget.style.transform = 'translateX(10px)')}
              onMouseOut={e => !isSelected && (e.currentTarget.style.transform = 'translateX(0)')}
            >
              <div style={{ width: '40px', color: 'var(--text-secondary)', fontWeight: 600 }}>{String(i + 1).padStart(2, '0')}</div>
              <img src={track.img} alt="cover" style={{ width: '64px', height: '64px', borderRadius: '8px', objectFit: 'cover', marginRight: '24px' }} />
              <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '4px' }}>{track.title}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{track.dj}</div>
                </div>
                <div style={{ width: '150px' }}>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>BPM</div>
                  <div style={{ fontWeight: 600 }}>{track.bpm}</div>
                </div>
                <div style={{ width: '150px' }}>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Género</div>
                  <div style={{ fontWeight: 600, color: 'var(--accent-color)' }}>{track.genre}</div>
                </div>
                <button className="btn-glass" style={{ padding: '8px 20px', fontSize: '0.9rem' }} onClick={(e) => { e.stopPropagation(); /* lógica de descarga */ }}>
                 Descargar
              </button>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default Remixes;
