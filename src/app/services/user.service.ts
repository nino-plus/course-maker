import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { combineLatest, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth
  ) {}

  getUser(uid: string): Observable<User> {
    return this.db.doc<User>(`users/${uid}`).valueChanges();
  }

  updateUserName(uid: string, displayName: string): Promise<void> {
    return this.db.doc(`users/${uid}`).update({
      displayName,
    });
  }

  async updateUserAvatar(uid: string, url: string): Promise<void> {
    const result = await this.storage
      .ref(`users/${uid}`)
      .putString(url, 'data_url');
    const avatarUrl = await result.ref.getDownloadURL();
    return this.db.doc(`users/${uid}`).update({
      avatarUrl,
    });
  }

  getCompleteUsers(courseId: string): Observable<User[]> {
    return this.db
      .collection(`courses/${courseId}/completedUserIds`)
      .valueChanges()
      .pipe(
        switchMap((users) => {
          return combineLatest(
            users.map((user: { userId: string }) => {
              return this.db.doc<User>(`users/${user.userId}`).valueChanges();
            })
          );
        })
      );
  }

  async deleteUser(): Promise<void> {
    return (await this.afAuth.currentUser).delete();
  }
}
