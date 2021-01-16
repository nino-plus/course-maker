import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Course } from '../interfaces/course';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private db: AngularFirestore) {}

  getCourses(): Observable<Course[]> {
    return this.db
      .collection<Course>('posts', (ref) => ref.orderBy('createdAt', 'desc'))
      .valueChanges();
  }

  deleteCourse(id: string): Promise<void> {
    return this.db.doc<Course>(`posts/${id}`).delete();
  }
}
