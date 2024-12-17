import React from 'react';
import { Car } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';

interface HeroActionsProps {
  onBookRide: () => void;
}

export function HeroActions({ onBookRide }: HeroActionsProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap gap-4">
      <button 
        onClick={onBookRide}
        className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center"
      >
        <Car className="h-6 w-6 mr-2" />
        {t('hero.bookRide')}
      </button>
      
      <button 
        onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
        className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold text-lg hover:bg-white/20 transition-all"
      >
        {t('hero.learnMore')}
      </button>
    </div>
  );
}