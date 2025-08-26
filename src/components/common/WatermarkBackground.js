import React from 'react';

export default function WatermarkBackground({ 
  imageUrl = "/images/logo.png",
  size = "90%",
  opacity = 0.05,
  scale = 1.5
}) {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        backgroundImage: `url("${imageUrl}")`,
        backgroundSize: size,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: opacity,
        transform: `scale(${scale})`
      }}
    />
  );
} 