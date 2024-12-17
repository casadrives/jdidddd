import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MAPBOX_CONFIG } from '../config/mapbox';
import { AlertTriangle } from 'lucide-react';

interface Marker {
  coordinates: [number, number];
  type: 'pickup' | 'dropoff' | 'driver' | 'driver-busy';
}

interface LocationMapProps {
  className?: string;
  center?: [number, number];
  markers?: Marker[];
  showRoute?: boolean;
}

export function LocationMap({ 
  className = '', 
  center = MAPBOX_CONFIG.defaultCenter,
  markers = [], 
  showRoute = false 
}: LocationMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_CONFIG.accessToken) return;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: MAPBOX_CONFIG.style,
        center,
        zoom: MAPBOX_CONFIG.defaultZoom,
        attributionControl: false
      });

      map.current.addControl(new mapboxgl.AttributionControl({
        compact: true
      }));

      return () => {
        map.current?.remove();
      };
    } catch (error) {
      console.error('Map initialization error:', error);
    }
  }, []);

  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    markers.forEach(marker => {
      const el = document.createElement('div');
      el.className = 'w-8 h-8 flex items-center justify-center';
      
      switch (marker.type) {
        case 'pickup':
          el.innerHTML = '<div class="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>';
          break;
        case 'dropoff':
          el.innerHTML = '<div class="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>';
          break;
        case 'driver':
          el.innerHTML = '<div class="w-6 h-6 bg-blue-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center"><svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L19 21l-7-4-7 4 7-19z"/></svg></div>';
          break;
        case 'driver-busy':
          el.innerHTML = '<div class="w-6 h-6 bg-gray-400 rounded-full border-2 border-white shadow-lg flex items-center justify-center"><svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L19 21l-7-4-7 4 7-19z"/></svg></div>';
          break;
      }

      const newMarker = new mapboxgl.Marker(el)
        .setLngLat(marker.coordinates)
        .addTo(map.current!);

      markersRef.current.push(newMarker);
    });

    // Fit bounds if there are markers
    if (markers.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      markers.forEach(marker => bounds.extend(marker.coordinates));
      map.current.fitBounds(bounds, { padding: 50 });
    }
  }, [markers]);

  if (!MAPBOX_CONFIG.accessToken) {
    return (
      <div className={`${className} flex items-center justify-center bg-gray-100 rounded-lg`}>
        <div className="text-center text-gray-500 p-4">
          <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
          <p className="font-medium">Map Error</p>
          <p className="text-sm mt-1">Mapbox access token is missing</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={mapContainer} 
      className={`${className} relative bg-gray-100 rounded-lg overflow-hidden`}
      style={{ minHeight: '300px' }}
    />
  );
}