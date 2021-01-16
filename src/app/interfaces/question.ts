export interface Question {
  text: string;
  hint?: string;
  answer: string;
  position: google.maps.LatLng;
  imageURL: string;
}
