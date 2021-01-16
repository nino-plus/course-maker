import firebase from 'firebase/app';
import { User } from './user';
import { Question } from './question';
export interface Course {
  title: string;
  courseId: string;
  creatorId: string;
  createdAt: firebase.firestore.Timestamp;
  playCount: number;
  clearUserCount: number;
  questions: Question[];
}

export interface CourseWithUser extends Course {
  user: User;
}
