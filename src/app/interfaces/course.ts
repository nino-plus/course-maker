import firebase from 'firebase/app';
import { User } from './user';
import { Question } from './question';
export interface Course {
  title: string;
  courseId: string;
  creatorId: string;
  thumbnailURL?: string;
  createdAt: firebase.firestore.Timestamp;
  playCount: number;
  completedUserCount: number;
  questions: Question[];
}

export interface CourseWithUser extends Course {
  user: User;
}
