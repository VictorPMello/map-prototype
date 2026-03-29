export async function getLatLngFromAddress(address: string) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) throw new Error("Missing GOOGLE_MAPS_API_KEY");

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address,
    )}&key=${apiKey}`,
  );

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error("Endereço não encontrado");
  }

  const location = data.results[0].geometry.location;

  return {
    lat: location.lat,
    lng: location.lng,
  };
}
