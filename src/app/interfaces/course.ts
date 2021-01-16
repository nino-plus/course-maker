import { Question } from './question';

export interface Course {
  title: string;
  courseId: string;
  creatorId: string;
  createdAt: number;
  playCount: number;
  clearUserCount: number;
  questions: Question[];
}
