import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

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
