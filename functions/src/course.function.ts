import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { deleteCollectionByPath } from './utils/delete.function';

const db = admin.firestore();

export const countUpPlayed = functions
  .region('asia-northeast1')
  .https.onCall((courseId, context) => {
    if (courseId) {
      return db
        .doc(`courses/${courseId}`)
        .update('playCount', admin.firestore.FieldValue.increment(1));
    } else {
      return;
    }
  });

export const deleteCourseCompletedUserIds = functions
  .region('asia-northeast1')
  .firestore.document('courses/{courseId}')
  .onDelete(async (snap, context) => {
    return deleteCollectionByPath(`courses/${context.params.courseId}`);
  });
