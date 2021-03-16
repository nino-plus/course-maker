import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { combineLatest, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../interfaces/user';
import firebase from 'firebase/app';

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
    return this.db.doc<Partial<User>>(`users/${uid}`).update({
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
    const user: firebase.User = await this.afAuth.currentUser;
    const twitterAuthProvider: firebase.auth.TwitterAuthProvider = new firebase.auth.TwitterAuthProvider();
    return user
      .reauthenticateWithPopup(twitterAuthProvider)
      .then(() => {
        return user.delete();
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
