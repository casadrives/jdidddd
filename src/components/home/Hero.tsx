import React from 'react';
import { Car, Star, Shield, Clock } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

interface HeroProps {
  onBookRide: () => void;
}

export function Hero({ onBookRide }: HeroProps) {
  const { t } = useTranslation();

  return (
    <div id="hero" className="relative min-h-screen">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1592906209472-a36b1f3782ef?auto=format&fit=crop&q=80"
          alt="Luxembourg City"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center">
        <div className="max-w-2xl">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white mb-6">
              <Star className="h-5 w-5 text-yellow-400 mr-2" />
              <span>Rated 4.9/5 by our customers</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {t('hero.title')}
            </h1>
            
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              {t('hero.subtitle')}
            </p>
          </div>

          <div className="space-y-6">
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

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center">
                <Shield className="h-8 w-8 text-blue-400 mr-3" />
                <div>
                  <h3 className="text-white font-semibold">Licensed Drivers</h3>
                  <p className="text-gray-300 text-sm">Professional & verified</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center">
                <Clock className="h-8 w-8 text-blue-400 mr-3" />
                <div>
                  <h3 className="text-white font-semibold">24/7 Service</h3>
                  <p className="text-gray-300 text-sm">Always available</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center">
                <Car className="h-8 w-8 text-blue-400 mr-3" />
                <div>
                  <h3 className="text-white font-semibold">Premium Fleet</h3>
                  <p className="text-gray-300 text-sm">Luxury vehicles</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-1 h-16 bg-white/20 rounded-full relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/40 animate-scroll"></div>
          </div>
        </div>
      </div>
    </div>
  );
}