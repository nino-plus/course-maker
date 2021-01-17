import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { Question } from 'src/app/interfaces/question';
import { CourseService } from 'src/app/services/course.service';
import { JudgeQuestionDialogComponent } from '../judge-question-dialog/judge-question-dialog.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  @Input() isCompleted: boolean;
  courseId: string;
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
        width: '800px',
        restoreFocus: false,
        autoFocus: false,
        data: {
          selected: this.answerCtrl.value,
          answer: question.answer,
          hint: question.hint,
          isCompleted: this.isCompleted,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result && !this.isCompleted) {
          this.router.navigate(['/play-course'], {
            queryParamsHandling: 'merge',
            queryParams: {
              courseId: this.courseId,
              questionNumber: ++this.questionNumber,
            },
          });
        } else if (result && this.isCompleted) {
          console.log('fsafsda');
          this.router.navigate(['/play-course/result']);
        }
      });
  }
}
