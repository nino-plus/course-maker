import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {
  deleteCollectionByPath,
  deleteCollectionByReference,
} from './utils/delete.function';

const db = admin.firestore();

export const createUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate((user) => {
    return db.doc(`users/${user.uid}`).set({
      uid: user.uid,
      displayName: user.displayName,
      avatarUrl: user.photoURL,
      createdAt: new Date(),
    });
  });

export const deleteUserAccount = functions
  .region('asia-northeast1')
  .auth.user()
  .onDelete(async (user, _) => {
    const uid = user.uid;
    const courses = db.collection(`courses`).where('creatorId', '==', uid);
    const deleteAllCourses = deleteCollectionByReference(courses);
    const deleteAllCompleteCourses = deleteCollectionByPath(
      `users/${uid}/completeCourses`
    );
    return Promise.all([deleteAllCourses, deleteAllCompleteCourses]);
  });
