import React from 'react';
import { Star } from 'lucide-react';

export function HeroRating() {
  return (
    <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white mb-6">
      <Star className="h-5 w-5 text-yellow-400 mr-2" />
      <span>Rated 4.9/5 by our customers</span>
    </div>
  );
}