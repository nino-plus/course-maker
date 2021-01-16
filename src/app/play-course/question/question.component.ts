import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { JudgeQuestionDialogComponent } from '../judge-question-dialog/judge-question-dialog.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  answerCtrl = new FormControl();

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

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
          console.log(result);
        }
      });
  }
}
