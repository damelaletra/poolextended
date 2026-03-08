import React from 'react';
import TiltedCard from '../components/TiltedCard';

const DJs = () => {
  const djs = [
    { name: "David Krass DJ", style: "EDM / Tech House", img: "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?auto=format&fit=crop&q=80&w=400&h=400", tracks: 145 },
    { name: "Dj CA Play", style: "Reggaeton / Dembow", img: "https://images.unsplash.com/photo-1493225457124-a1a2a5f5f9af?auto=format&fit=crop&q=80&w=400&h=400", tracks: 210 },
    { name: "Dj Franco", style: "Hip Hop / R&B", img: "https://images.unsplash.com/photo-1544785316-6e58f000b0e5?auto=format&fit=crop&q=80&w=400&h=400", tracks: 89 },
    { name: "Dj Ghost", style: "Trap / Latin", img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=400&h=400", tracks: 302 },
    { name: "Dj Khaly", style: "Salsa / Bachata", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=400&h=400", tracks: 124 },
    { name: "Orly Dj", style: "Cubaton / Reparto", img: "https://images.unsplash.com/photo-1614613535308-eb5fbd6e2c17?auto=format&fit=crop&q=80&w=400&h=400", tracks: 450 },
  ];

  return (
    <div style={{ marginTop: '40px' }}>
      <h1 style={{ fontSize: '3rem', margin: '0 0 8px 0', fontWeight: 700, textAlign: 'center' }}>NUESTROS DJS RESIDENTES</h1>
      <p style={{ color: 'var(--text-secondary)', margin: '0 0 60px 0', fontSize: '1.2rem', textAlign: 'center' }}>Creadores de primer nivel que ofrecen las mejores herramientas para tus sets.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '32px' }}>
        {djs.map((dj, i) => (
          <TiltedCard
            key={i}
            imageSrc={dj.img}
            altText={dj.name}
            captionText={`${dj.name} - ${dj.style}`}
            containerHeight="400px"
            containerWidth="100%"
            imageHeight="400px"
            imageWidth="100%"
            rotateAmplitude={12}
            scaleOnHover={1.05}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={true}
            overlayContent={
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                <h3 className="tilted-info-title">{dj.name}</h3>
                <p className="tilted-info-subtitle">{dj.style}</p>
                <div className="tilted-info-stats">
                  {dj.tracks} Pistas Exclusivas
                </div>
                <button className="btn-glass btn-accent" style={{ width: '100%' }}>Ver Perfil</button>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
};

export default DJs;

