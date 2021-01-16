import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgeQuestionDialogComponent } from './judge-question-dialog.component';

describe('JudgeQuestionDialogComponent', () => {
  let component: JudgeQuestionDialogComponent;
  let fixture: ComponentFixture<JudgeQuestionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JudgeQuestionDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JudgeQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
