import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course } from '../interfaces/course';
import { Question } from '../interfaces/question';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private db: AngularFirestore) {}

  getCoursesByCreatorId(creatorId: string): Observable<Course[]> {
    return this.db
      .collection<Course>(`courses`, (ref) =>
        ref.where('creatorId', '==', `${creatorId}`)
      )
      .valueChanges();
  }

  getCourse(courseId: string): Observable<Course> {
    return this.db.doc<Course>(`courses/${courseId}`).valueChanges();
  }

  getQuestion(courseId: string, questionNumber: number): Observable<Question> {
    return this.getCourse(courseId).pipe(
      map((course) => course.questions[--questionNumber])
    );
  }
}
