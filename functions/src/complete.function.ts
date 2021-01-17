import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { shouldEventRun, markEventTried } from './utils/should.function';

const db = admin.firestore();

export const countUpCompleted = functions
  .region('asia-northeast1')
  .firestore.document('courses/{courseId}/completedUserIds/{userId}')
  .onCreate(async (snap, context) => {
    const eventId = context.eventId;
    return shouldEventRun(eventId)
      .catch((error) => {
        return error;
      })
      .then((should: boolean) => {
        if (should) {
          db.doc(`courses/${context.params.courseId}`)
            .update(
              'completedUserCount',
              admin.firestore.FieldValue.increment(1)
            )
            .catch((error) => {
              return error;
            });
          return markEventTried(eventId);
        } else {
          return;
        }
      });
  });

export const countUpCompletedOnCall = functions
  .region('asia-northeast1')
  .https.onCall((courseId, context) => {
    if (courseId) {
      return db
        .doc(`courses/${courseId}`)
        .update('completedUserCount', admin.firestore.FieldValue.increment(1));
    } else {
      return;
    }
  });
