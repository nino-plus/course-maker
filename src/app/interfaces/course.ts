import firebase from 'firebase/app';
import { User } from './user';
export interface Course {
  courseId: string;
  creatorId: string;
  createdAt: firebase.firestore.Timestamp;
  playCounts: number;
  clearUserCounts: number;
  title: string;
}

export interface CourseWithUser extends Course {
  user: User;
}
