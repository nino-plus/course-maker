import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';
import { Course } from '../interfaces/course';
import { CourseService } from './course.service';

@Injectable({
  providedIn: 'root',
})
export class SetMetaTagsService {
  constructor(
    private titleService: Title,
    private meta: Meta,
    private courseService: CourseService,
    private course: Course
  ) {
    // 静的なページの設定
    this.titleService.setTitle('トップページ | サイト名');
    this.meta.addTags([
      { name: 'description', content: 'ページの概要文' },
      { property: 'og:type', content: 'コンテンツタイプ' },
      { property: 'og:title', content: 'ページのタイトル' },
      { property: 'og:description', content: 'ページの概要文' },
      { property: 'og:url', content: location.href },
      { name: 'twitter:card', content: 'ツイッターカードのサイズ' },
      { property: 'og:image', content: 'ページのサムネイル' },
    ]);
    // 動的なページの場合
    this.courseService.getCourse(this.course.courseId).pipe(
      tap((course) => {
        this.titleService.setTitle(`${course.title} | CourseMaker`);
        this.meta.addTags([
          { property: 'og:title', content: course.title },
          {
            name: 'description',
            content: 'マップを使った謎解きゲームアプリ'.slice(0, 120),
          },
          { property: 'og:image', content: course.thumbnailURL },
        ]);
      })
    );
  }
}
