import React from 'react';
import './GlitchLogo.css';

const GlitchLogo = ({ src }) => {
  return (
    <div className="glitch-wrapper">
      <div className="glitch" data-glitch="[LOGO]">
        <img src={src} alt="RemixHub Logo Glitch" className="glitch-img" />
      </div>
    </div>
  );
};

export default GlitchLogo;
