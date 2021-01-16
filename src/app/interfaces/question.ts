export interface Question {
  title: string;
  hint?: string;
  answer: string;
  mapPosition: google.maps.LatLngLiteral;
  imageURL?: string;
}
