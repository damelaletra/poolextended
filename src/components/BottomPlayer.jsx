import React, { useState, useRef, useEffect } from 'react';

const PlayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5.14v14l11-7-11-7z" />
  </svg>
);
const PauseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);
const PreviousIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
  </svg>
);
const NextIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
  </svg>
);

import { usePlayer } from '../contexts/PlayerContext';

const BottomPlayer = () => {
  const { currentTrack } = usePlayer();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Play automatically when track changes
  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("Auto-play prevented:", err));
    } else {
      setIsPlaying(false);
      setProgress(0);
    }
  }, [currentTrack]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration > 0) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleSeek = (e) => {
    if (audioRef.current) {
      const bounds = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - bounds.left;
      const percentage = clickX / bounds.width;
      audioRef.current.currentTime = percentage * audioRef.current.duration;
      setProgress(percentage * 100);
    }
  };

  if (!currentTrack) return null;

  return (
    <div style={{ position: 'fixed', bottom: '40px', left: '50%', transform: 'translateX(-50%)', width: '90%', maxWidth: '900px', zIndex: 100 }}>
      {/* Elemento de audio invisible para reproducir los archivos */}
      <audio 
        ref={audioRef} 
        src={currentTrack.audioSrc} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="glass-panel mobile-player" style={{ 
        display: 'flex', alignItems: 'center', padding: '16px 32px', 
        borderRadius: '50px', justifyContent: 'space-between',
        borderTopColor: 'rgba(255,255,255,0.3)',
        background: 'rgba(255,255,255,0.08)' 
      }}>
        
        <div className="audio-player-controls mobile-player-controls">
          <button><PreviousIcon /></button>
          <button className="play-btn" onClick={togglePlayPause}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button><NextIcon /></button>
        </div>

        <div className="mobile-player-info" style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1, margin: '0 40px' }}>
          <img src={currentTrack.img} alt="cover" style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }} />
          <div style={{ minWidth: '150px' }}>
            <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '4px' }}>{currentTrack.title}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{currentTrack.dj}</div>
          </div>
          
          {/* Liquid Progress Bar (Interactive) */}
          <div 
            onClick={handleSeek}
            style={{ 
              flex: 1, height: '6px', background: 'rgba(255,255,255,0.2)', 
              borderRadius: '3px', marginLeft: '16px', position: 'relative',
              overflow: 'hidden', cursor: 'pointer'
            }}
          >
            <div style={{ 
              position: 'absolute', top: 0, left: 0, height: '100%', width: `${progress}%`, 
              background: 'linear-gradient(90deg, #00e5ff, #ccff00)', borderRadius: '3px',
              boxShadow: '0 0 10px rgba(204, 255, 0, 0.5)',
              transition: 'width 0.1s linear'
            }}></div>
          </div>
        </div>

        <div className="mobile-player-actions" style={{ display: 'flex', gap: '24px', color: 'rgba(255,255,255,0.8)' }}>
          <span style={{ cursor: 'pointer', fontSize: '1.2rem', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='rgba(255,255,255,0.8)'}>≡</span>
          <span style={{ cursor: 'pointer', fontSize: '1.2rem', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='rgba(255,255,255,0.8)'}>🔊</span>
        </div>

      </div>
    </div>
  );
};

export default BottomPlayer;
