import React from 'react';
import { HeroBackground } from './HeroBackground';
import { HeroContent } from './HeroContent';
import { ScrollIndicator } from './ScrollIndicator';

interface HeroProps {
  onBookRide: () => void;
}

export function Hero({ onBookRide }: HeroProps) {
  return (
    <div id="hero" className="relative min-h-screen">
      <HeroBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center">
        <HeroContent onBookRide={onBookRide} />
      </div>

      <ScrollIndicator />
    </div>
  );
}