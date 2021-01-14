import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayCourseRoutingModule } from './play-course-routing.module';
import { PlayCourseComponent } from './play-course/play-course.component';
import { ResultDialogComponent } from './result-dialog/result-dialog.component';


@NgModule({
  declarations: [PlayCourseComponent, ResultDialogComponent],
  imports: [
    CommonModule,
    PlayCourseRoutingModule
  ]
})
export class PlayCourseModule { }
