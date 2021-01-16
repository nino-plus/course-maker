import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-play-course',
  templateUrl: './play-course.component.html',
  styleUrls: ['./play-course.component.scss'],
})
export class PlayCourseComponent implements OnInit {
  isCrear: boolean;
  questionNumber: number;
  isCompleted: boolean;

  questions$ = this.route.queryParamMap.pipe(
    tap((params) => {
      this.questionNumber = parseInt(params.get('questionNumber'), 10);
    }),
    switchMap((params) => {
      return this.courseService.getCourse(params.get('courseId')).pipe(take(1));
    }),
    map((course) => course.questions)
  );

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.questions$.subscribe((questions) => {
      if (questions.length === this.questionNumber) {
        this.isCompleted = true;
      }
    });
  }
}
