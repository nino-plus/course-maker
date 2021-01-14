import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayCourseComponent } from './play-course/play-course.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PlayCourseComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayCourseRoutingModule { }
