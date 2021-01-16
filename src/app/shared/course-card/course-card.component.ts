import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Course } from 'src/app/interfaces/course';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent implements OnInit {
  @Input() user: User;
  @Input() course: Course;

  creator$: Observable<User>;
  user$: Observable<User> = this.authService.user$;
  uid: string;

  constructor(
    private authService: AuthService,
    private courseService: CourseService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.creator$ = this.userService
      .getUser(this.course.creatorId)
      .pipe(take(1));
    this.user$
      .pipe(take(1))
      .toPromise()
      .then((user) => {
        this.uid = user.uid;
      });
  }
  deleteCourse(): void {
    this.courseService.deleteCourse(this.course.id).then(() => {
      this.snackBar.open('削除しました！');
    });
  }
}
