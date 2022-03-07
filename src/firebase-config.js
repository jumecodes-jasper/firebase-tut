import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.React_App_apiKey,
    authDomain: process.env.React_App_authDomain,
    projectId: process.env.React_App_projectId,
    storageBucket: process.env.React_App_storage,
    messagingSenderId:  process.env.React_App_messagingSenderId,
    appId:  process.env.React_App_appId,
    measurementId:  process.env.React_App_measurementId
  };

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);