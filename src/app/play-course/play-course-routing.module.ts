import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayCourseComponent } from './play-course/play-course.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PlayCourseComponent,
  },
  {
    path: 'result',
    component: ResultComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayCourseRoutingModule {}
