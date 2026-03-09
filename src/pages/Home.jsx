import React, { useState, useEffect } from 'react';
import TiltedCard from '../components/TiltedCard';
import { usePlayer } from '../contexts/PlayerContext';
import LiquidEther from '../components/LiquidEther';
import Hover3DLogo from '../components/Hover3DLogo';
import { MorphingText } from '../registry/magicui/morphing-text';
import MetallicPaint from '../components/MetallicPaint';
import { Link } from 'react-router-dom';

const Home = () => {
  const { setCurrentTrack } = usePlayer();
  const [activeCard, setActiveCard] = useState(1);
  useEffect(() => {
    // Only keeping empty effect to not break rules on hooks if you later want to restore functionality
  }, []);

  // Mock songs grouped by category to replace the 3D Carousel
  const recentUploads = [
    { id: '1', title: "Summer Vibes (Extended Mix)", artist: "DJ Neon", bpm: "125", key: "Am", time: "4:32" },
    { id: '2', title: "Midnight Groove (Original Mix)", artist: "The Weeknd Bootleg", bpm: "128", key: "Gm", time: "5:10" },
    { id: '3', title: "Sunset Bounce (Acapella In)", artist: "DJ Eclipse", bpm: "126", key: "C#m", time: "3:45" },
    { id: '4', title: "Electric Horizon (Club Edit)", artist: "DJ Silva", bpm: "128", key: "Dm", time: "4:20" }
  ];

  const topDownloads = [
    { id: '5', title: "Festival Anthem (VIP Edit)", artist: "DJ Carlos", bpm: "130", key: "Fm", time: "4:15" },
    { id: '6', title: "Classic Rewind (Remix)", artist: "DJ Neon", bpm: "124", key: "Dm", time: "6:20" },
    { id: '7', title: "Underground Rhythm (Dub)", artist: "The Weeknd Bootleg", bpm: "127", key: "Em", time: "5:45" },
    { id: '8', title: "Bassline Dropper (Bootleg)", artist: "DJ Silva", bpm: "128", key: "Am", time: "5:00" }
  ];

  const genres = [
    { title: 'Electrónica', desc: 'Explora los últimos lanzamientos', img: '/assets/cover_tech_house.png' },
    { title: 'Latino / Urbano', desc: 'Flow y ritmo puro', img: '/assets/cover_reggaeton.png' },
    { title: 'Salsa', desc: 'Percusiones envolventes', img: '/assets/cover_salsa.png' },
    { title: 'Pop Hits', desc: 'Beats y barras clásicas', img: '/assets/cover_pop_hits.png' }
  ];

  const textOptions = [
    "Reparto",
    "Reggueton",
    "Salsa",
    "Timba",
    "Merengue",
    "Música Urbana",
  ];

  return (
    <>
      {/* Giant 3D Logo Pendulum */}
      {/* We use negative margin top to pull the logo up past the default navbar spacing */}
      <section className="mobile-p-sm" style={{ textAlign: 'center', margin: '-300px 0 100px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1, width: '100%', boxSizing: 'border-box' }}>
        <div className="pendulum-logo" style={{ marginBottom: '-300px', maxWidth: '2800px', width: '200%', display: 'flex', justifyContent: 'center' }}>
          <Hover3DLogo src="/logo.png" height="auto" />
        </div>

        <h1 style={{ fontWeight: 700, margin: '0 0 24px 0', lineHeight: 1.0, letterSpacing: '-2px' }}>
          <span style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', display: 'block', marginBottom: '10px' }}>
            Los mejores extended de:
          </span>
          <div style={{ 
            color: 'var(--accent-color)',
            display: 'inline-block',
            width: '100%',
            marginTop: '10px',
            fontSize: 'clamp(4rem, 8vw, 6rem)'
          }}>
            <MorphingText texts={textOptions} />
          </div>
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 48px auto', lineHeight: 1.6 }}>
          La plataforma principal para DJs profesionales. Descubre remixes de alta calidad, video loops y ediciones exclusivas en una impresionante experiencia líquida.
        </p>
        <div className="mobile-hero-btns" style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
          <Link to="/register" className="btn-glass btn-accent" style={{ padding: '16px 36px', fontSize: '1.1rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>Comienza Gratis</Link>
          <Link to="/remixes" className="btn-glass" style={{ padding: '16px 36px', fontSize: '1.1rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>Explorar Catálogo</Link>
        </div>
      </section>

      {/* Recent & Top Tracks Sections */}
      <section style={{ marginBottom: '80px', display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
        
        {/* Subidas Recientes */}
        <div className="glass-panel" style={{ flex: '1 1 400px', padding: '32px' }}>
          <h2 style={{ fontSize: '1.8rem', margin: '0 0 24px 0', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>
            Subidas Recientes
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {recentUploads.map((song) => (
              <div key={song.id} 
                onClick={() => setCurrentTrack({ title: song.title, dj: song.artist, img: '/logo.png' })}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  padding: '12px 16px', 
                  background: 'rgba(255,255,255,0.02)', 
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.05)',
                  transition: 'background 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
              >
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem' }}>{song.title}</h4>
                  <div style={{ display: 'flex', gap: '12px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    <span>{song.artist}</span>
                    <span>|</span>
                    <span>{song.bpm} BPM</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Descargas */}
        <div className="glass-panel" style={{ flex: '1 1 400px', padding: '32px' }}>
          <h2 style={{ fontSize: '1.8rem', margin: '0 0 24px 0', color: 'var(--accent-color)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>
            Top Descargas Diarias
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {topDownloads.map((song, idx) => (
              <div key={song.id} 
                onClick={() => setCurrentTrack({ title: song.title, dj: song.artist, img: '/logo.png' })}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  padding: '12px 16px', 
                  background: 'rgba(255,255,255,0.02)', 
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.05)',
                  transition: 'background 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: idx < 3 ? 'var(--accent-color)' : 'var(--text-secondary)', width: '20px', textAlign: 'center' }}>
                    {idx + 1}
                  </span>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem' }}>{song.title}</h4>
                    <div style={{ display: 'flex', gap: '12px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                      <span>{song.artist}</span>
                      <span>|</span>
                      <span>{song.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Featured Genres Categories */}
      <section style={{ marginBottom: '100px' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '40px', textAlign: 'center' }}>Categorías Destacadas</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          {genres.map((genre, i) => (
             <TiltedCard
               key={i}
               imageSrc={genre.img}
               altText={genre.title}
               captionText={`${genre.title} - ${genre.desc}`}
               containerHeight="300px"
               containerWidth="100%"
               imageHeight="300px"
               imageWidth="100%"
               rotateAmplitude={12}
               scaleOnHover={1.05}
               showMobileWarning={false}
               showTooltip={true}
               displayOverlayContent={true}
               overlayContent={
                 <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                   <h3 className="tilted-info-title">{genre.title}</h3>
                   <p className="tilted-info-subtitle" style={{ color: 'var(--text-secondary)' }}>{genre.desc}</p>
                 </div>
               }
             />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
