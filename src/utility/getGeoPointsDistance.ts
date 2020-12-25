function numberToRad(value: number): number {
  return (value * Math.PI) / 180;
}

export function getGeoPointsDistance(
  origin: google.maps.LatLng,
  destination: google.maps.LatLng,
): number {
  const R = 6371; // Radius of the earth in km
  const dLat = numberToRad(destination.lat() - origin.lat()); // Javascript functions in radians
  const dLon = numberToRad(destination.lng() - origin.lng());
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(numberToRad(origin.lat())) *
      Math.cos(numberToRad(destination.lat())) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  // Distance in km
  return R * c;
}
