import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
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
}
