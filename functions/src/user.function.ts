import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {
  deleteCollectionByPath,
  deleteCollectionByReference,
} from './utils/delete.function';

const db = admin.firestore();
const storage = admin.storage().bucket();

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
    const completedUserIds = db
      .collectionGroup('completedUserIds')
      .where('userId', '==', uid);
    const deleteUser = db.doc(`users/${uid}`).delete();
    const deleleteUserStorage = storage.deleteFiles({
      directory: `users/${uid}`,
    });
    const deleteAllCourses = deleteCollectionByReference(courses);
    const deleteAllCompleteCourses = deleteCollectionByPath(
      `users/${uid}/completeCourses`
    );
    const deleteAllCompletedUserIds = deleteCollectionByReference(
      completedUserIds
    );
    return Promise.all([
      deleteAllCourses,
      deleteAllCompleteCourses,
      deleteUser,
      deleleteUserStorage,
      deleteAllCompletedUserIds,
    ]);
  });
