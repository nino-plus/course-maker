import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-judge-question-dialog',
  templateUrl: './judge-question-dialog.component.html',
  styleUrls: ['./judge-question-dialog.component.scss'],
})
export class JudgeQuestionDialogComponent implements OnInit {
  isCrear: boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      selected: string;
      answer: string;
      hint: string;
    }
  ) {}

  ngOnInit(): void {
    if (this.data.selected === this.data.answer) {
      this.isCrear = true;
    }
  }
}
