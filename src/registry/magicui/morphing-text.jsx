import React, { useEffect, useRef } from "react";

const morphTime = 0.8;
const cooldownTime = 1.0;

const useMorphingText = (texts) => {
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);

  useEffect(() => {
    let textIndex = 0;
    let time = new Date();
    let morph = 0;
    let cooldown = cooldownTime;

    if (!text1Ref.current || !text2Ref.current) return;

    text1Ref.current.textContent = texts[textIndex % texts.length];
    text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];

    function doMorph() {
      morph -= cooldown;
      cooldown = 0;

      let fraction = morph / morphTime;

      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }

      setMorph(fraction);
    }

    function setMorph(fraction) {
      if (!text1Ref.current || !text2Ref.current) return;

      text2Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      text2Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      let fraction2 = 1 - fraction;
      text1Ref.current.style.filter = `blur(${Math.min(8 / fraction2 - 8, 100)}px)`;
      text1Ref.current.style.opacity = `${Math.pow(fraction2, 0.4) * 100}%`;

      text1Ref.current.textContent = texts[textIndex % texts.length];
      text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];
    }

    function doCooldown() {
      morph = 0;

      if (!text1Ref.current || !text2Ref.current) return;

      text2Ref.current.style.filter = "";
      text2Ref.current.style.opacity = "100%";

      text1Ref.current.style.filter = "";
      text1Ref.current.style.opacity = "0%";
    }

    let animationFrameId;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      const newTime = new Date();
      const shouldIncrementIndex = cooldown > 0;
      const dt = (newTime.getTime() - time.getTime()) / 1000;
      time = newTime;

      cooldown -= dt;

      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex++;
        }

        doMorph();
      } else {
        doCooldown();
      }
    }

    animate();
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [texts]);

  return {
    text1Ref,
    text2Ref,
  };
};

export const MorphingText = ({ texts, className = "" }) => {
  const { text1Ref, text2Ref } = useMorphingText(texts);

  return (
    <div
      className={className}
      style={{ 
        position: 'relative', 
        marginLeft: 'auto', 
        marginRight: 'auto', 
        height: '120px', 
        width: '100%', 
        maxWidth: '1024px', 
        textAlign: 'center', 
        fontFamily: 'sans-serif', 
        fontWeight: 'bold', 
        lineHeight: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        filter: "url(#threshold) blur(0.6px)" 
      }}
    >
      <span
        ref={text1Ref}
        style={{ 
          position: 'absolute', 
          width: '100%', 
          textAlign: 'center', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          fontSize: 'inherit', 
          left: '50%', 
          transform: 'translateX(-50%)' 
        }}
      />
      <span
        ref={text2Ref}
        style={{ 
          position: 'absolute', 
          width: '100%', 
          textAlign: 'center', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          fontSize: 'inherit', 
          left: '50%', 
          transform: 'translateX(-50%)' 
        }}
      />

      <svg id="filters" style={{ position: 'absolute', height: 0, width: 0 }} preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -80"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};
