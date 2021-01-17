import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { Course } from 'src/app/interfaces/course';
import { Question } from 'src/app/interfaces/question';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { CompleteService } from 'src/app/services/complete.service';
import { CourseService } from 'src/app/services/course.service';
import { JudgeQuestionDialogComponent } from '../judge-question-dialog/judge-question-dialog.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit, OnDestroy {
  @Input() isCompleted: boolean;
  courseId: string;
  user: User;
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

  private subscription: Subscription;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private authService: AuthService,
    private completeService: CompleteService
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService.user$.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

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
          let countUpCompleted: Promise<void | void[]>;
          if (this.user) {
            countUpCompleted = this.completeService.completeCourse(
              this.courseId,
              this.user.uid
            );
          } else {
            countUpCompleted = this.courseService.countUpCompleted(
              this.courseId
            );
          }
          countUpCompleted.then(() => {
            this.router.navigate(['/play-course/result']);
          });
        }
      });
  }
}
