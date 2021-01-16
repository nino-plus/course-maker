import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Course, CourseWithUser } from '../interfaces/course';
import { Question } from '../interfaces/question';
import { User } from '../interfaces/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private db: AngularFirestore, private userService: UserService) {}

  createCourse(course: Course): Promise<void> {
    return this.db.doc<Course>(`courses/${course.courseId}`).set(course);
  }

  getCourses(): Observable<CourseWithUser[]> {
    return this.db
      .collection<Course>('courses')
      .valueChanges()
      .pipe(
        switchMap((courses: Course[]) => {
          const creatorIds: string[] = Array.from(
            new Set(
              courses.map((course) => {
                return course.creatorId;
              })
            )
          );
          const creators$: Observable<User[]> = combineLatest(
            creatorIds.map((id) => {
              return this.userService.getUser(id);
            })
          );
          return combineLatest([of(courses), creators$]);
        }),
        map(([courses, creators]) => {
          return courses.map((course) => {
            return {
              ...course,
              user: creators.find(
                (creator) => course.creatorId === creator.uid
              ),
            };
          });
        })
      );
  }

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
