export function validateMapboxToken(token: string): Promise<boolean> {
  return new Promise(async (resolve) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/luxembourg.json?access_token=${token}&limit=1`
      );

      if (!response.ok) {
        throw new Error('Invalid token');
      }

      const data = await response.json();
      resolve(Boolean(data.features?.length));
    } catch (error) {
      console.error('Mapbox token validation failed:', error);
      resolve(false);
    }
  });
}

export function validateCommissionRate(rate: number): boolean {
  return !isNaN(rate) && rate >= 0 && rate <= 100;
}

export function validateAddress(address: string): boolean {
  return address.trim().length >= 5;
}