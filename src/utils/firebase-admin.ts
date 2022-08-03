import * as admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';

let firebaseAdmin;

if (!admin.apps.length) {
  firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    })
  });
}

const firebaseAdminAuth = getAuth(firebaseAdmin);

export default firebaseAdminAuth;
