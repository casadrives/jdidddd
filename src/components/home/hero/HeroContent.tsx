import React from 'react';
import { useTranslation } from '../../../hooks/useTranslation';
import { HeroRating } from './HeroRating';
import { HeroActions } from './HeroActions';
import { HeroFeatures } from './HeroFeatures';

interface HeroContentProps {
  onBookRide: () => void;
}

export function HeroContent({ onBookRide }: HeroContentProps) {
  const { t } = useTranslation();

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <HeroRating />
        
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          {t('hero.title')}
        </h1>
        
        <p className="text-xl text-gray-200 mb-8 leading-relaxed">
          {t('hero.subtitle')}
        </p>
      </div>

      <div className="space-y-6">
        <HeroActions onBookRide={onBookRide} />
        <HeroFeatures />
      </div>
    </div>
  );
}