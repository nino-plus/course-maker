import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormGuard } from '../guards/form.guard';
import { CreateCourseComponent } from './create-course/create-course.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CreateCourseComponent,
    canDeactivate: [FormGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateCourseRoutingModule {}
