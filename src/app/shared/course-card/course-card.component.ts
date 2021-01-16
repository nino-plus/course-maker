import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/interfaces/course';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent implements OnInit {
  @Input() user: User;
  @Input() course: Course;

  author$: Observable<User>;
  // user$: Observable<User> = this.authService.user$;
  uid: string;

  constructor(
    private authService: AuthService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {}
}
