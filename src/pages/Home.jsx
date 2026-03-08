import React, { useState } from 'react';
import TiltedCard from '../components/TiltedCard';
import { usePlayer } from '../contexts/PlayerContext';
import { MorphingText } from '../registry/magicui/morphing-text';
import MetallicPaint from '../components/MetallicPaint';

const Home = () => {
  const { setCurrentTrack } = usePlayer();
  const [activeCard, setActiveCard] = useState(1);

  const cards = [
    { id: 0, title: "Cyberpunk Mix", dj: "DJ Neon", img: "/covers/cover1.png" },
    { id: 1, title: "Blinding Lights", dj: "The Weeknd Bootleg", img: "/covers/cover2.png" },
    { id: 2, title: "Deep House Set", dj: "DJ Eclipse", img: "/covers/cover3.png" },
    { id: 3, title: "Afro Beats 2026", dj: "DJ Silva", img: "/covers/cover4.png" },
    { id: 4, title: "Latino Mashup", dj: "DJ Carlos", img: "/covers/cover5.png" },
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
      <section style={{ textAlign: 'center', margin: '40px 0 100px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ 
          display: 'inline-block', padding: '6px 16px', borderRadius: '20px', 
          background: 'rgba(204, 255, 0, 0.1)', border: '1px solid rgba(204, 255, 0, 0.2)',
          color: 'var(--accent-color)', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '1px', marginBottom: '24px' 
        }}>
          ACTUALIZACIÓN LIQUID V2.0
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
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
          <button className="btn-glass btn-accent" style={{ padding: '16px 36px', fontSize: '1.1rem' }}>Comienza Gratis</button>
          <button className="btn-glass" style={{ padding: '16px 36px', fontSize: '1.1rem' }}>Explorar Catálogo</button>
        </div>
      </section>

      {/* 3D Liquid Carousel */}
      <section style={{ 
        position: 'relative', height: '400px', display: 'flex', justifyContent: 'center', 
        alignItems: 'center', perspective: '1200px', margin: '0 auto', marginBottom: '100px'
      }}>
        {cards.map((card, idx) => {
          const isActive = idx === activeCard;
          const isLeft = idx < activeCard;
          
          let transform = 'translateZ(-200px) scale(0.6)';
          let opacity = 0;
          let zIndex = 0;

          if (isActive) {
            transform = 'translateZ(50px) scale(1.1)';
            opacity = 1;
            zIndex = 10;
          } else if (idx === activeCard - 1) {
            transform = 'translateX(-220px) translateZ(-50px) rotateY(15deg) scale(0.9)';
            zIndex = 5;
            opacity = 0.8;
          } else if (idx === activeCard + 1) {
            transform = 'translateX(220px) translateZ(-50px) rotateY(-15deg) scale(0.9)';
            zIndex = 5;
            opacity = 0.8;
          } else if (idx === activeCard - 2) {
            transform = 'translateX(-400px) translateZ(-150px) rotateY(25deg) scale(0.7)';
            zIndex = 2;
            opacity = 0.4;
          } else if (idx === activeCard + 2) {
            transform = 'translateX(400px) translateZ(-150px) rotateY(-25deg) scale(0.7)';
            zIndex = 2;
            opacity = 0.4;
          }

          return (
            <div 
              key={card.id} 
              className="glass-panel" 
              onClick={() => {
                setActiveCard(idx);
                setCurrentTrack(card);
              }}
              style={{ 
                position: 'absolute',
                width: '280px',
                height: '360px',
                transform,
                opacity,
                zIndex,
                display: 'flex', 
                flexDirection: 'column', 
                padding: '16px',
                cursor: 'pointer',
                transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                boxShadow: isActive ? '0 20px 50px rgba(0,0,0,0.5)' : 'var(--glass-shadow)',
                pointerEvents: opacity === 0 ? 'none' : 'auto'
              }}
            >
              <div style={{ 
                flex: 1, 
                borderRadius: '16px', 
                marginBottom: '16px', 
                backgroundImage: `url(${card.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)'
              }} />
              <div style={{ textAlign: 'center', paddingBottom: '8px' }}>
                <h3 style={{ margin: '0 0 6px 0', fontSize: '1.25rem' }}>{card.title}</h3>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{card.dj}</p>
              </div>
            </div>
          )
        })}
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
