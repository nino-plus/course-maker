import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { Course } from 'src/app/interfaces/course';
import { Question } from 'src/app/interfaces/question';
import { CourseService } from 'src/app/services/course.service';
import { JudgeQuestionDialogComponent } from '../judge-question-dialog/judge-question-dialog.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  courseId: string;
  course$: Observable<Course> = this.route.queryParamMap.pipe(
    switchMap((params) => {
      if (params) {
        this.courseId = params.get('courseId');
        this.courseId = 'QzIz2Q0UlposxdXm3XD6';
        return this.courseService.getCourse(this.courseId).pipe(take(1));
      } else {
        return of(null);
      }
    })
  );
  questionNumber: number;
  question$: Observable<Question> = this.route.queryParamMap.pipe(
    tap(() => {
      this.answerCtrl.reset();
    }),
    switchMap((params) => {
      if (params) {
        this.courseId = params.get('courseId');
        this.questionNumber = parseInt(params.get('questionNumber'), 10);
        this.courseId = 'QzIz2Q0UlposxdXm3XD6';
        return this.courseService
          .getQuestion(this.courseId, this.questionNumber)
          .pipe(take(1));
      } else {
        return of(null);
      }
    })
  );

  answerCtrl = new FormControl();

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {}

  openJudgeDialog(question: Question): void {
    this.dialog
      .open(JudgeQuestionDialogComponent, {
        width: '500px',
        restoreFocus: false,
        autoFocus: false,
        data: {
          selected: this.answerCtrl.value,
          answer: question.answer,
          hint: question.hint,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.router.navigate(['/play-course'], {
            queryParamsHandling: 'merge',
            queryParams: {
              courseId: this.courseId,
              questionNumber: ++this.questionNumber,
            },
          });
        }
      });
  }
}
