import firebase from 'firebase/app';
export interface Course {
  courseId: string;
  creatorId: string;
  createdAt: firebase.firestore.Timestamp;
  playCounts: number;
  clearUserCounts: number;
  title: string;
}
