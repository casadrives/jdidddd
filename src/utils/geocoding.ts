import { MAPBOX_CONFIG } from '../config/mapbox';

export async function searchAddress(query: string) {
  try {
    if (!query.trim() || !MAPBOX_CONFIG.accessToken) {
      return [];
    }

    const params = new URLSearchParams({
      access_token: MAPBOX_CONFIG.accessToken,
      country: MAPBOX_CONFIG.geocoding.country,
      types: MAPBOX_CONFIG.geocoding.types,
      language: MAPBOX_CONFIG.geocoding.languages,
      limit: MAPBOX_CONFIG.geocoding.limit.toString(),
      proximity: '6.13,49.61', // Luxembourg City for better local results
    });

    const response = await fetch(
      `${MAPBOX_CONFIG.geocoding.endpoint}/${encodeURIComponent(query)}.json?${params}`
    );

    if (!response.ok) {
      throw new Error(`Geocoding failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.features || [];
  } catch (error) {
    console.error('Error searching address:', error);
    return [];
  }
}

export async function reverseGeocode(coordinates: [number, number]) {
  try {
    if (!MAPBOX_CONFIG.accessToken) {
      throw new Error('Mapbox access token is missing');
    }

    const [longitude, latitude] = coordinates;
    const params = new URLSearchParams({
      access_token: MAPBOX_CONFIG.accessToken,
      types: MAPBOX_CONFIG.geocoding.types,
      language: MAPBOX_CONFIG.geocoding.languages,
    });

    const response = await fetch(
      `${MAPBOX_CONFIG.geocoding.endpoint}/${longitude},${latitude}.json?${params}`
    );

    if (!response.ok) {
      throw new Error(`Reverse geocoding failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.features[0] || null;
  } catch (error) {
    console.error('Error reverse geocoding:', error);
    return null;
  }
}