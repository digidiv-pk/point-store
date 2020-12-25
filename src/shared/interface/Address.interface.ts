export interface AddressInterface {
  locality: string;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
}
