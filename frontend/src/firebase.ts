import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection,
  query,
  where,
  getDocs,
  orderBy,
  enableIndexedDbPersistence,
  Timestamp 
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Check if all required environment variables are present
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
];

const missingEnvVars = requiredEnvVars.filter(varName => !import.meta.env[varName]);

if (missingEnvVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Auth and Firestore instances
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Enable offline persistence
enableIndexedDbPersistence(db)
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
      console.warn('The current browser doesn\'t support all of the features required to enable persistence');
    }
  });

// Helper functions for user data management
export const saveUserProfile = async (userId: string, profileData: any) => {
  if (!userId) {
    throw new Error('User ID is required to save profile');
  }

  try {
    console.log('Attempting to save profile for user:', userId);
    console.log('Profile data:', profileData);
    
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      ...profileData,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    
    console.log('Profile saved successfully');
    return true;
  } catch (error: any) {
    console.error('Error saving user profile:', error);
    throw new Error(error.message || 'Failed to save profile');
  }
};

export const getUserProfile = async (userId: string) => {
  if (!userId) {
    throw new Error('User ID is required to fetch profile');
  }

  try {
    console.log('Fetching profile for user:', userId);
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log('Profile found:', docSnap.data());
      return docSnap.data();
    } else {
      console.log('No profile found for user');
      return null;
    }
  } catch (error: any) {
    console.error('Error fetching user profile:', error);
    throw new Error(error.message || 'Failed to fetch profile');
  }
};

// Helper functions for report management
export const saveReport = async (userId: string, reportData: any) => {
  if (!userId) {
    throw new Error('User ID is required to save report');
  }

  try {
    const reportsRef = collection(db, 'reports');
    const reportDoc = doc(reportsRef);
    await setDoc(reportDoc, {
      ...reportData,
      userId,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    
    return reportDoc.id;
  } catch (error: any) {
    console.error('Error saving report:', error);
    throw new Error(error.message || 'Failed to save report');
  }
};

export const getUserReports = async (userId: string) => {
  if (!userId) {
    throw new Error('User ID is required to fetch reports');
  }

  try {
    const reportsRef = collection(db, 'reports');
    const q = query(
      reportsRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error: any) {
    console.error('Error fetching user reports:', error);
    throw new Error(error.message || 'Failed to fetch reports');
  }
};

export default app; 