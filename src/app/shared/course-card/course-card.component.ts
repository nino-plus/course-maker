import { Component, Input, OnInit } from '@angular/core';
import { CourseWithUser } from 'src/app/interfaces/course';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent implements OnInit {
  @Input() courseWithUser: CourseWithUser;
  constructor() {}

  ngOnInit(): void {}
}
