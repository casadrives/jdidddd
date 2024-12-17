import mapboxgl from 'mapbox-gl';

// Validate environment variables
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
const MAPBOX_STYLE = import.meta.env.VITE_MAPBOX_STYLE;

if (!MAPBOX_TOKEN) {
  console.error('Missing required VITE_MAPBOX_TOKEN environment variable');
}

if (!MAPBOX_STYLE) {
  console.error('Missing required VITE_MAPBOX_STYLE environment variable');
}

// Mapbox configuration
export const MAPBOX_CONFIG = {
  accessToken: MAPBOX_TOKEN,
  style: MAPBOX_STYLE,
  defaultCenter: [6.13, 49.61] as [number, number], // Luxembourg City
  defaultZoom: 13,
  geocoding: {
    endpoint: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    country: 'lu',
    types: 'address,poi',
    languages: 'fr,en,de,lu',
    limit: 5,
  }
};

// Initialize Mapbox
export const initializeMapbox = async (): Promise<boolean> => {
  try {
    if (!MAPBOX_CONFIG.accessToken) {
      throw new Error('Mapbox access token is missing');
    }

    // Set access token
    mapboxgl.accessToken = MAPBOX_CONFIG.accessToken;

    // Test token validity with a simple request
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/luxembourg.json?access_token=${MAPBOX_CONFIG.accessToken}&limit=1`
    );

    if (!response.ok) {
      throw new Error('Invalid Mapbox access token');
    }

    return true;
  } catch (error) {
    console.error('Mapbox initialization failed:', error);
    return false;
  }
};