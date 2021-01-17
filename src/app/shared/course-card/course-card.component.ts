import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { Course } from 'src/app/interfaces/course';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CourseWithUser } from 'src/app/interfaces/course';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent implements OnInit {
  @Input() courseWithUser: CourseWithUser;
  @Input() course: Course;

  user$: Observable<User> = this.authService.user$;

  constructor(
    public authService: AuthService,
    private userService: UserService,
    private courseService: CourseService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  countUpPlayed(courseId: string): void {
    this.courseService.countUpPlayed(courseId).then(() => {
      this.router.navigate(['/play-course'], {
        queryParams: {
          courseId,
          questionNumber: 1,
        },
      });
    });
  }
}
