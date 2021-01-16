import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Course } from '../interfaces/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private db: AngularFirestore) { }

  getCoursesByCreatorId(creatorId: string): Observable<Course[]>{
    return this.db.collection<Course>(`courses`, ref => ref.where('creatorId','==', `${creatorId}`))
    .valueChanges();
  }

}
