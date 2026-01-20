import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase once using the official browser ESM bundles from the importmap
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Upload a base64 image to Firebase Storage and return the download URL
export const uploadReceiptImage = async (base64Data: string, userId: string): Promise<string> => {
  const timestamp = Date.now();
  const fileName = `receipts/${userId}/${timestamp}.jpg`;
  const storageRef = ref(storage, fileName);

  // Upload the base64 string (remove data URL prefix if present)
  const base64Content = base64Data.includes(',') ? base64Data.split(',')[1] : base64Data;
  await uploadString(storageRef, base64Content, 'base64', {
    contentType: 'image/jpeg'
  });

  // Get and return the download URL
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

export default app;