import React, { useRef, useState } from 'react';
import './Hover3DLogo.css';

const Hover3DLogo = ({ src, height = 'auto' }) => {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({});

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculates rotation based on mouse position relative to center
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -15; // Max 15deg rotation
    const rotateY = ((x - centerX) / centerX) * 15;

    // Glare effect positioning
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
      '--glare-pos': `${glareX}% ${glareY}%`
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      '--glare-pos': '50% 50%',
      transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
    });
  };

  return (
    <div 
      className="hover-3d-wrapper"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ ...style, transition: style.transition || 'none' }}
    >
      <img src={src} alt="RemixHub Logo 3D" className="hover-3d-img" style={{ height }} />
      <div 
        className="hover-3d-glare"
        style={{
          maskImage: `url(${src})`,
          WebkitMaskImage: `url(${src})`
        }}
      ></div>
    </div>
  );
};

export default Hover3DLogo;
