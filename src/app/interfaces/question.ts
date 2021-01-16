export interface Question {
  text: string;
  title: string;
  hint?: string;
  answer: string;
  mapPosition: google.maps.LatLngLiteral;
  imageURL?: string;
}
