import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { CourseCardComponent } from './course-card/course-card.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [CourseCardComponent],
  imports: [CommonModule, SharedRoutingModule, MatMenuModule, MatIconModule],
  exports: [CourseCardComponent],
})
export class SharedModule {}
