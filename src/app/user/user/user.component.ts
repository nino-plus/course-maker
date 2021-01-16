import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/interfaces/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  courses: Course[];

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    const creatorId = this.route.snapshot.paramMap.get('creatorId');
    this.courseService.getCoursesByCreatorId(creatorId).subscribe((courses) => {
      this.courses = courses;
    });

  }

}
