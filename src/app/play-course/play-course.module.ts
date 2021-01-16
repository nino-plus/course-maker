import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayCourseRoutingModule } from './play-course-routing.module';
import { PlayCourseComponent } from './play-course/play-course.component';
import { ResultDialogComponent } from './result-dialog/result-dialog.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { SharedModule } from '../shared/shared.module';
import { QuestionComponent } from './question/question.component';

@NgModule({
  declarations: [PlayCourseComponent, ResultDialogComponent, QuestionComponent],
  imports: [
    CommonModule,
    PlayCourseRoutingModule,
    GoogleMapsModule,
    SharedModule,
  ],
})
export class PlayCourseModule {}
