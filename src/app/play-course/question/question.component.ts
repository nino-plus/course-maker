import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  answerCtrl = new FormControl();

  constructor() {}

  ngOnInit(): void {}

  openJudgeDialog(): void {
    alert('fafaffafdsfgdsads');
    console.log(this.answerCtrl.value);
  }
}
