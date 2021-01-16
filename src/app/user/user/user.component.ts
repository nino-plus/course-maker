import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Course } from 'src/app/interfaces/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  courses$: Observable<Course[]> = this.route.paramMap.pipe(
    switchMap((params) => {
      if (params){
        return this.courseService.getCoursesByCreatorId(params.get('creatorId'))
      } else {
        return of(null);
      }
    })
  )

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {

  }

}
