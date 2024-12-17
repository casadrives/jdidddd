import { useState, useEffect } from 'react';

interface GeolocationState {
  location: { latitude: number; longitude: number } | null;
  error: string | null;
  isLoading: boolean;
}

export function useGeolocation(options: PositionOptions = {}) {
  const [state, setState] = useState<GeolocationState>({
    location: null,
    error: null,
    isLoading: true,
  });

  useEffect(() => {
    let mounted = true;
    let watchId: number;

    const onSuccess = (position: GeolocationPosition) => {
      if (!mounted) return;
      setState({
        location: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
        error: null,
        isLoading: false,
      });
    };

    const onError = (error: GeolocationPositionError) => {
      if (!mounted) return;
      setState({
        location: null,
        error: error.message,
        isLoading: false,
      });
    };

    // Check if geolocation is supported
    if (!navigator.geolocation) {
      setState({
        location: null,
        error: 'Geolocation is not supported by your browser',
        isLoading: false,
      });
      return;
    }

    // Get initial position
    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
      ...options,
    });

    // Watch position
    watchId = navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
      ...options,
    });

    return () => {
      mounted = false;
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  return state;
}