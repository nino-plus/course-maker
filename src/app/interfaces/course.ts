import { Question } from './question';

export interface Course {
  courseId: string;
  creatorId: string;
  createdAt: Date;
  title: string;
  questions: Question[];
  playCounts: number;
  clearUserCounts: number;
}
