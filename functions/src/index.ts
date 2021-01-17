import * as admin from 'firebase-admin';

admin.initializeApp();
export { createUser } from './user.function';
export { countUpCompleted } from './complete.function';
export { countUpCompletedOnCall } from './complete.function';
export { countUpPlayed } from './course.function';
