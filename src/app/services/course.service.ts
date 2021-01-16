import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { Course } from '../interfaces/course';
import { Question } from '../interfaces/question';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(
    private db: AngularFirestore,
    private authService: AuthService,
    private storage: AngularFireStorage
  ) {}

  async createCourse(course: Course) {
    await this.db.doc<Course>(`courses/${course.courseId}`).set(course);
  }

  getCoursesByCreatorId(creatorId: string): Observable<Course[]> {
    return this.db
      .collection<Course>(`courses`, (ref) =>
        ref.where('creatorId', '==', `${creatorId}`)
      )
      .valueChanges();
  }
}
