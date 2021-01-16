import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { Course } from '../interfaces/course';
import { Question } from '../interfaces/question';
import { AuthService } from './auth.service';

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

  async setImageToStorage(
    couseId: string,
    file: string,
    i: number
  ): Promise<string> {
    const result = await this.storage
      .ref(`courses/${couseId}/question${i}`)
      .putString(file, 'data_url');
    return result.ref.getDownloadURL();
  }
}
