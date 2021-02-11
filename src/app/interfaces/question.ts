export interface Question {
  text: string;
  title: string;
  hint?: string;
  inputHint?: string;
  answer: string;
  mapPosition: google.maps.LatLngLiteral;
  imageURL?: string;
}
