import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Course } from '../interfaces/course';
import { User } from '../interfaces/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private db: AngularFirestore, private userService: UserService) {}

  getCourses() {
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
  // deleteCourse(courseId: string): Promise<void> {
  //   return this.db.doc<Course>(`courses/${courseId}`).delete();
  // }
}
