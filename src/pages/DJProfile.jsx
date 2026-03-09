import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Download, Heart, Share2, Music, ShieldCheck } from 'lucide-react';
import { usePlayer } from '../contexts/PlayerContext';

const djDatabase = {
  "david-krass-dj": { name: "David Krass DJ", style: "EDM / Tech House", img: "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?auto=format&fit=crop&q=80&w=600&h=600", tracks: 145, followers: "12k", country: "ES", genres: ["EDM", "Tech House", "Electro"] },
  "dj-ca-play": { name: "Dj CA Play", style: "Reggaeton / Dembow", img: "https://images.unsplash.com/photo-1493225457124-a1a2a5f5f9af?auto=format&fit=crop&q=80&w=600&h=600", tracks: 210, followers: "34k", country: "PR", genres: ["Reggaeton", "Dembow", "Urbano"] },
  "dj-franco": { name: "Dj Franco", style: "Hip Hop / R&B", img: "https://images.unsplash.com/photo-1544785316-6e58f000b0e5?auto=format&fit=crop&q=80&w=600&h=600", tracks: 89, followers: "8.5k", country: "US", genres: ["Hip Hop", "R&B", "Trap"] },
  "dj-ghost": { name: "Dj Ghost", style: "Trap / Latin", img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600&h=600", tracks: 302, followers: "45k", country: "MX", genres: ["Trap", "Latin", "Moombah"] },
  "dj-khaly": { name: "Dj Khaly", style: "Salsa / Bachata", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=600&h=600", tracks: 124, followers: "22k", country: "CO", genres: ["Salsa", "Bachata", "Merengue"] },
  "orly-dj": { name: "Orly Dj", style: "Cubaton / Reparto", img: "https://images.unsplash.com/photo-1614613535308-eb5fbd6e2c17?auto=format&fit=crop&q=80&w=600&h=600", tracks: 450, followers: "60k", country: "CU", genres: ["Cubaton", "Reparto", "Timba"] }
};

// Mock songs grouped by category
const mockCatalog = [
  {
    category: "Lanzamientos Recientes",
    songs: [
      { id: '1', title: "Summer Vibes (Extended Mix)", bpm: "125", key: "Am", time: "4:32" },
      { id: '2', title: "Midnight Groove (Original Mix)", bpm: "128", key: "Gm", time: "5:10" },
      { id: '3', title: "Sunset Bounce (Acapella In)", bpm: "126", key: "C#m", time: "3:45" },
      { id: '7', title: "Electric Horizon (Club Edit)", bpm: "128", key: "Dm", time: "4:20" },
      { id: '8', title: "Deep Oceans (Vocal Mix)", bpm: "124", key: "Ebm", time: "5:30" },
      { id: '9', title: "Neon Nights (Instrumental)", bpm: "125", key: "Fm", time: "4:05" },
    ]
  },
  {
    category: "Top Descargas Diarias",
    songs: [
      { id: '4', title: "Festival Anthem (VIP Edit)", bpm: "130", key: "Fm", time: "4:15" },
      { id: '5', title: "Classic Rewind (Remix)", bpm: "124", key: "Dm", time: "6:20" },
      { id: '6', title: "Underground Rhythm (Dub)", bpm: "127", key: "Em", time: "5:45" },
      { id: '10', title: "Bassline Dropper (Bootleg)", bpm: "128", key: "Am", time: "5:00" },
      { id: '11', title: "Euphoria State (Trance Mix)", bpm: "138", key: "Cm", time: "6:10" },
      { id: '12', title: "House Connection (Original)", bpm: "125", key: "Gm", time: "4:50" },
    ]
  }
];

const DJProfile = () => {
  const { id } = useParams();
  const { setCurrentTrack } = usePlayer();
  
  // Fallback to a generic profile if ID not found
  const dj = djDatabase[id] || { name: id.replace(/-/g, ' ').toUpperCase(), style: "Multi-Genre", img: "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?auto=format&fit=crop&q=80&w=600&h=600", tracks: 0, followers: "0", country: "Desconocido", genres: ["Pop", "Electro"] };

  return (
    <div style={{ marginTop: '20px', paddingBottom: '80px' }}>
      
      {/* Back button */}
      <Link to="/djs" style={{ display: 'inline-block', marginBottom: '24px', color: 'var(--accent-color)', textDecoration: 'none', fontWeight: 600 }}>
        &larr; Volver al Listado de DJs
      </Link>

      {/* Hero Header Glass Panel */}
      <div className="glass-panel" style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', padding: '40px', alignItems: 'center', marginBottom: '40px', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative blur blob */}
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: 'var(--accent-color)', opacity: 0.15, filter: 'blur(80px)', borderRadius: '50%', pointerEvents: 'none' }} />
        
        {/* DJ Avatar */}
        <div style={{ width: '220px', height: '220px', borderRadius: '50%', overflow: 'hidden', border: '4px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', flexShrink: 0 }}>
          <img src={dj.img} alt={dj.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        
        {/* DJ Info */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <h1 style={{ fontSize: '3.5rem', margin: 0, lineHeight: 1 }}>{dj.name}</h1>
            <ShieldCheck size={32} color="var(--accent-color)" />
          </div>
          <p style={{ fontSize: '1.4rem', color: 'var(--accent-color)', margin: '0 0 24px 0', fontWeight: 'bold' }}>{dj.style}</p>
          
          <div style={{ display: 'flex', gap: '32px', marginBottom: '32px' }}>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{dj.tracks}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Tracks</div>
            </div>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{dj.followers}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Seguidores</div>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '16px' }}>
            <button className="btn-accent" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 32px', borderRadius: '30px', fontWeight: 'bold', fontSize: '1.1rem', border: 'none', cursor: 'pointer' }}>
              <Heart size={20} fill="currentColor" /> Seguir
            </button>
            <button className="btn-glass" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '30px', fontWeight: 'bold', fontSize: '1rem' }}>
              <Share2 size={20} color="white" /> Compartir
            </button>
          </div>
        </div>
      </div>

      {/* Genre Filter Row */}
      <div className="no-scrollbar" style={{ display: 'flex', gap: '16px', marginBottom: '40px', overflowX: 'auto', paddingBottom: '24px', paddingTop: '16px', paddingLeft: '24px', paddingRight: '24px', marginLeft: '-24px' }}>
        <button className="btn-accent" style={{ padding: '8px 20px', fontSize: '0.95rem', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Todos</button>
        {dj.genres.map((genre, index) => (
          <button key={index} className="btn-glass" style={{ padding: '8px 20px', fontSize: '0.95rem', whiteSpace: 'nowrap' }}>
            {genre}
          </button>
        ))}
      </div>

      {/* Catalog Grid View */}
      <h2 style={{ fontSize: '2rem', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>Catálogo Exclusivo</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        {mockCatalog.map((block, idx) => (
          <div key={idx} className="glass-panel" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '1.5rem', margin: '0 0 24px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Music size={24} color="var(--accent-color)" /> {block.category}
            </h3>
            
            <div className="no-scrollbar" style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '400px', overflowY: 'auto', paddingRight: '4px' }}>
              {block.songs.map((song) => (
                <div key={song.id} 
                  onClick={() => setCurrentTrack({ title: song.title, dj: dj.name, img: dj.img })}
                  style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  padding: '16px 24px', 
                  background: 'rgba(255,255,255,0.03)', 
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.05)',
                  transition: 'background 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
                    <button 
                      style={{ 
                        width: '48px', height: '48px', borderRadius: '50%', background: 'var(--accent-color)', border: 'none', 
                        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
                        color: 'black'
                      }}>
                      <Play size={20} fill="black" style={{ marginLeft: '4px' }} />
                    </button>
                    <div>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '1.1rem' }}>{song.title}</h4>
                      <div style={{ display: 'flex', gap: '16px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        <span><strong style={{color: 'white'}}>BPM:</strong> {song.bpm}</span>
                        <span><strong style={{color: 'white'}}>Key:</strong> {song.key}</span>
                        <span>{song.time}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={(e) => e.stopPropagation()} 
                    className="btn-glass" 
                    style={{ padding: '12px 24px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Download size={18} /> Descargar
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default DJProfile;
