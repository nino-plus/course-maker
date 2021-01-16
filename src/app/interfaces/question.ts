export interface Question {
  text: string;
  hint?: string;
  answer: string;
  mapPosition: google.maps.LatLngLiteral;
  imageURL?: string;
}
