import React from 'react';

export function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
      <div className="animate-bounce">
        <div className="w-1 h-16 bg-white/20 rounded-full relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/40 animate-scroll"></div>
        </div>
      </div>
    </div>
  );
}