import { useState, useEffect } from 'react';
import { MAPBOX_CONFIG, initializeMapbox } from '../config/mapbox';

export function useMapbox() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        const success = await initializeMapbox();
        if (!mounted) return;
        
        if (!success) {
          throw new Error('Failed to initialize Mapbox');
        }
        
        setIsInitialized(true);
      } catch (err) {
        if (!mounted) return;
        setError(err instanceof Error ? err.message : 'Failed to initialize map');
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, []);

  return { isInitialized, error };
}