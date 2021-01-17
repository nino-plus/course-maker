import { Injectable } from '@angular/core';
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CreateCourseComponent } from '../create-course/create-course/create-course.component';

@Injectable({
  providedIn: 'root',
})
export class FormGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: CreateCourseComponent
  ): Observable<boolean> | boolean {
    // フォームがあるコンポーネント内の値によって入力中か否かを判断する
    // 通常はフォームがノータッチか、あるいは投稿が正しく完了した条件で遷移を許可する
    if (component.form.pristine || component.isComplete) {
      return true;
    }

    const confirmation = window.confirm(
      '作業中の内容が失われますがよろしいですか？'
    );

    return of(confirmation);
  }
}
