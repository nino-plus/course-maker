import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateCourseRoutingModule } from './create-course-routing.module';
import { CreateCourseComponent } from './create-course/create-course.component';


@NgModule({
  declarations: [CreateCourseComponent],
  imports: [
    CommonModule,
    CreateCourseRoutingModule
  ]
})
export class CreateCourseModule { }
