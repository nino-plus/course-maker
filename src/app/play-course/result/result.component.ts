import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { Course } from 'src/app/interfaces/course';
import { User } from 'src/app/interfaces/user';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  completeUses$: Observable<User[]> = this.route.paramMap.pipe(
    switchMap((params) => {
      return this.userService.getCompleteUsers(params.get('id')).pipe(take(1));
    })
  );
  course$: Observable<Course> = this.route.paramMap.pipe(
    switchMap((params) => {
      if (params) {
        return this.courseService.getCourse(params.get('id')).pipe(take(1));
      } else {
        return of(null);
      }
    })
  );

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {}
}
