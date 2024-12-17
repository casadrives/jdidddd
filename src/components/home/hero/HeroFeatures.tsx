import React from 'react';
import { Shield, Clock, Car } from 'lucide-react';

export function HeroFeatures() {
  const features = [
    {
      icon: Shield,
      title: 'Licensed Drivers',
      description: 'Professional & verified',
    },
    {
      icon: Clock,
      title: '24/7 Service',
      description: 'Always available',
    },
    {
      icon: Car,
      title: 'Premium Fleet',
      description: 'Luxury vehicles',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
      {features.map((feature) => (
        <div key={feature.title} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center">
          <feature.icon className="h-8 w-8 text-blue-400 mr-3" />
          <div>
            <h3 className="text-white font-semibold">{feature.title}</h3>
            <p className="text-gray-300 text-sm">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}