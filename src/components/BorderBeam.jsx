import React from 'react';
import './BorderBeam.css';

export const BorderBeam = ({
  className = "",
  size = 200,          // Usado para determinar el tamaño de propagación si fuera necesario en otras versiones
  duration = 8,
  borderWidth = 1.5,
  anchor = 90,
  colorFrom = "#ccff00",
  colorTo = "#00e5ff",
  delay = 0,
}) => {
  return (
    <div
      style={{
        "--size": size,
        "--duration": duration,
        "--anchor": anchor,
        "--border-width": borderWidth,
        "--color-from": colorFrom,
        "--color-to": colorTo,
        "--delay": `-${delay}s`,
      }}
      className={`border-beam-container ${className}`}
    ></div>
  );
};
