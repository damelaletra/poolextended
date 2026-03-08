import React from 'react';
import Navbar from '../components/Navbar';
import BottomPlayer from '../components/BottomPlayer';
import LiquidEther from './LiquidEther';
import Background from './Background';

const Layout = ({ children }) => {
  return (
    <>
      <Background />
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
        <LiquidEther
          colors={[ '#5227FF', '#FF9FFC', '#B19EEF' ]}
          mouseForce={35}
          cursorSize={120}
          isViscous={false}
          iterationsPoisson={16}
          resolution={0.35}
          isBounce
          autoDemo
          autoSpeed={0.8}
          autoIntensity={1.8}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>
      <Navbar />
      <main style={{ paddingTop: '160px', paddingBottom: '160px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '24px', paddingRight: '24px' }}>
        {children}
      </main>
      <BottomPlayer />
    </>
  );
};

export default Layout;
