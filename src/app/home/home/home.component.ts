import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import { take } from 'rxjs/internal/operators/take';
import { map, switchMap, tap } from 'rxjs/operators';
import { Course } from 'src/app/interfaces/course';
import { User } from 'src/app/interfaces/user';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  courses$: Observable<Course[]> = this.courseService.getCourses();
  courses: Course[] = [];
  isComplete: boolean;
  isLoading: boolean;
  subscription = new Subscription();
  prevLastDoc;
  lastDoc;

  constructor(
    private courseService: CourseService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getCourses();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getCourses() {
    if (this.isComplete || this.isLoading) {
      return;
    }
    this.isLoading = true;
    setTimeout(() => {
      this.courseService
        .getCoursesForInfinitScroll(this.lastDoc)
        .pipe(
          take(1),
          tap((docs) => {
            if (docs) {
              this.lastDoc = docs[docs.length - 1];
            }
          }),
          map((snaps) => {
            return snaps.map((snap) => snap.data() as Course);
          }),
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
        )
        .subscribe((docs) => {
          if (docs) {
            if (!docs.length) {
              this.isComplete = true;
              return;
            }
            // 最初の取得が３回coursesにプッシュされてしまうので、同じ配列の場合プッシュしないように条件式を設定
            if (JSON.stringify(docs) !== JSON.stringify(this.courses)) {
              this.courses.push(...docs);
            }
          }
        });
      this.isLoading = false;
    }, 500);
  }
}
