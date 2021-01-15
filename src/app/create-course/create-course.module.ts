import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateCourseRoutingModule } from './create-course-routing.module';
import { CreateCourseComponent } from './create-course/create-course.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [CreateCourseComponent],
  imports: [CommonModule, CreateCourseRoutingModule, GoogleMapsModule],
})
export class CreateCourseModule {}
