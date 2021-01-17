import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from './auth.service';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Course, CourseWithUser } from '../interfaces/course';
import { User } from '../interfaces/user';
import { UserService } from './user.service';
import { Question } from '../interfaces/question';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(
    private db: AngularFirestore,
    private authService: AuthService,
    private storage: AngularFireStorage,
    private userService: UserService
  ) {}

  async createCourse(course: Course) {
    await this.db.doc<Course>(`courses/${course.courseId}`).set(course);
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

  getCoursesWithUserByCreatorId(
    creatorId: string
  ): Observable<CourseWithUser[]> {
    return this.db
      .collection<Course>(`courses`, (ref) =>
        ref.where('creatorId', '==', `${creatorId}`)
      )
      .valueChanges()
      .pipe(
        switchMap((courses: Course[]) => {
          const user$ = this.userService.getUser(creatorId);
          return combineLatest([of(courses), user$]);
        }),
        map(([courses, user]) => {
          return courses.map((course) => {
            return {
              ...course,
              user,
            };
          });
        })
      );
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
