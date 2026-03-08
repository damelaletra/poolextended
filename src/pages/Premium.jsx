import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2
};

const PricingCard = ({ plan }) => {
  const ref = useRef(null);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(plan.recommended ? 1.05 : 1, springValues);

  function handleMouse(e) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const offsetX = x - rect.width / 2;
    const offsetY = y - rect.height / 2;
    const rotateAmplitude = 10;
    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;
    rotateX.set(rotationX);
    rotateY.set(rotationY);
  }

  function handleMouseEnter() {
    scale.set(plan.recommended ? 1.1 : 1.05);
  }

  function handleMouseLeave() {
    scale.set(plan.recommended ? 1.05 : 1);
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={`glass-panel ${plan.recommended ? 'recommended-plan' : ''}`}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ 
        padding: '40px 32px', 
        borderRadius: '24px',
        position: 'relative',
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
        border: plan.recommended ? '1px solid var(--accent-color)' : '1px solid var(--glass-border)',
        boxShadow: plan.recommended ? '0 10px 40px rgba(204, 255, 0, 0.15)' : 'var(--glass-shadow)',
        zIndex: plan.recommended ? 2 : 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      <div style={{ transform: "translateZ(30px)", display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', zIndex: 1 }}>
        {plan.recommended && (
          <div style={{ 
            position: 'absolute', top: '-56px', left: '50%', transform: 'translateX(-50%)',
            background: 'var(--accent-color)', color: '#0b0914', padding: '6px 16px', borderRadius: '20px',
            fontWeight: 700, fontSize: '0.9rem', letterSpacing: '1px',
            whiteSpace: 'nowrap'
          }}>
            MÁS POPULAR
          </div>
        )}
        <h3 style={{ fontSize: '1.5rem', margin: '0 0 16px 0' }}>{plan.name}</h3>
        <div style={{ marginBottom: '32px' }}>
          <span style={{ fontSize: '3.5rem', fontWeight: 700, letterSpacing: '-2px' }}>{plan.price}</span>
          <span style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>{plan.period}</span>
        </div>
        
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px 0', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '16px', flexGrow: 1 }}>
          {plan.features.map((feature, j) => (
            <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <button className={`btn-glass ${plan.recommended ? 'btn-accent' : ''}`} style={{ width: '100%', padding: '16px', fontSize: '1.1rem', marginTop: 'auto' }}>
          Elegir Plan
        </button>
      </div>
    </motion.div>
  );
};

const Premium = () => {
  const plans = [
    {
      name: "Básico",
      price: "$19.99",
      period: "/mes",
      features: ["150 Pistas Por Mes", "Remixes en Audio", "Alta Calidad 320kbps", "Soporte Básico"],
      recommended: false
    },
    {
      name: "Pro DJ",
      price: "$29.99",
      period: "/mes",
      features: ["250 Pistas Por Mes", "Remixes en Audio & Video", "Video Loops & FX", "Soporte Prioritario", "Ediciones Exclusivas"],
      recommended: true
    },
    {
      name: "Ilimitado",
      price: "$49.99",
      period: "/mes",
      features: ["Pistas Ilimitadas", "Todo en Audio & Video", "Loops & FX Premium", "Producciones Originales", "Soporte 24/7 Dedicado"],
      recommended: false
    }
  ];

  return (
    <div style={{ marginTop: '40px', textAlign: 'center', perspective: '1200px' }}>
      <h1 style={{ fontSize: '3rem', margin: '0 0 16px 0', fontWeight: 700 }}>ACCESO PREMIUM</h1>
      <p style={{ color: 'var(--text-secondary)', margin: '0 0 60px 0', fontSize: '1.2rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
        Desbloquea todo el poder de RemixHub. Descargas en alta calidad, videos exclusivos y producciones originales usadas por los mejores DJs del mundo.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', maxWidth: '1100px', margin: '0 auto', perspective: '1200px' }}>
        {plans.map((plan, i) => (
          <PricingCard key={i} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default Premium;

