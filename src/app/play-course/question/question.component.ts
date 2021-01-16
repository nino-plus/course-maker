import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { JudgeQuestionDialogComponent } from '../judge-question-dialog/judge-question-dialog.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  courseId: string;
  questionNumber: number;
  answerCtrl = new FormControl();

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.courseId = params.get('courseId');
      this.questionNumber = parseInt(params.get('questionNumber'), 10);
      this.answerCtrl.setValue(null);
    });
  }

  openJudgeDialog(): void {
    this.dialog
      .open(JudgeQuestionDialogComponent, {
        width: '800px',
        restoreFocus: false,
        autoFocus: false,
        data: {
          selected: this.answerCtrl.value,
          answer: 'test',
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
