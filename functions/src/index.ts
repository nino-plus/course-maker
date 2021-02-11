import * as admin from 'firebase-admin';

admin.initializeApp();
export { createUser, deleteUserAccount } from './user.function';
export { countUpCompleted } from './complete.function';
export { countUpCompletedOnCall } from './complete.function';
export { countUpPlayed, deleteCourseCompletedUserIds } from './course.function';
