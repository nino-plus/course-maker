import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/interfaces/course';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent implements OnInit {
  @Input() user: User;
  @Input() article: Course;

  author$: Observable<User>;
  // user$: Observable<User> = this.authService.user$;
  uid: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
}
