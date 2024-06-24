import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaParameters, signInWithPhoneNumber } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Get the Auth service for the initialized Firebase app
const firebaseAuth = getAuth(firebaseApp);

export { firebaseAuth, signInWithPhoneNumber };
