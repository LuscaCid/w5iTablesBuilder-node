import { FirebaseOptions, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import "dotenv/config";

export const firebaseConfig : FirebaseOptions = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
};
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export {
    app,
    database,
    storage,
    auth,
}