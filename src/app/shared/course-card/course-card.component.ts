import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Course, CourseWithUser } from 'src/app/interfaces/course';
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
  @Input() courseWithUser: CourseWithUser;

  user$: Observable<User> = this.authService.user$;
  uid: string;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private courseService: CourseService // private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}
}
