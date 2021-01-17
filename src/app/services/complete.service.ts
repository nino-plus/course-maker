import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class CompleteService {
  constructor(private db: AngularFirestore) {}

  completeCourse(courseId: string, userId: string): Promise<void[]> {
    return Promise.all([
      this.db
        .doc(`courses/${courseId}/completedUserIds/${userId}`)
        .set({ userId }),
      this.db
        .doc(`users/${userId}/completeCourses/${courseId}`)
        .set({ courseId }),
    ]);
  }
}
