import React from 'react';

export function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1592906209472-a36b1f3782ef?auto=format&fit=crop&q=80"
        alt="Luxembourg City"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
    </div>
  );
}