export interface Course {
  id: string;
  creatorId: string;
  createdAt: Date;
  playCounts: number;
  clearUserCounts: number;
  title: string;
}
