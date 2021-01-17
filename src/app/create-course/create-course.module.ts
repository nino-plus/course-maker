import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateCourseRoutingModule } from './create-course-routing.module';
import { CreateCourseComponent } from './create-course/create-course.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CropperModule } from '@deer-inc/ngx-croppie';
@NgModule({
  declarations: [CreateCourseComponent],
  imports: [
    CommonModule,
    CreateCourseRoutingModule,
    GoogleMapsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    CropperModule,
  ],
})
export class CreateCourseModule {}
