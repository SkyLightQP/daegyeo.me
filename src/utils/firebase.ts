import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBvEKd-lv2_xZKlVpVNXwesxIDIJU--UCw",
  authDomain: "daegyeome-site.firebaseapp.com",
  projectId: "daegyeome-site",
  storageBucket: "daegyeome-site.appspot.com",
  messagingSenderId: "524135997669",
  appId: "1:524135997669:web:5f83bbb1b2ded804c5b40c",
  measurementId: "G-DM8X5N4C0K"
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

export default firebaseAuth;
