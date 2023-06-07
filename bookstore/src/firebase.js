import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const apiKey = process.env.REACT_APP_FIREBASE_APIKEY;
const authDomain = process.env.REACT_APP_FIREBASE_AUTHDOMAIN;
const projectId = process.env.REACT_APP_FIREBASE_PROJECTID;
const storageBucket = process.env.REACT_APP_FIREBASE_STORAGEBUCKET;
const messagingSenderId = process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID;
const appId = process.env.REACT_APP_FIREBASE_APPID;

const firebaseConfig = {
 apiKey: `${apiKey}`,
 authDomain: `${authDomain}`,
 projectId: `${projectId}`,
 storageBucket: `${storageBucket}`,
 messagingSenderId: `${messagingSenderId}`,
 appId: `${appId}`,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth();

// Grant admin privileges to a user
const grantAdminPrivileges = (userId) => {
 const userRef = doc(db, "users", userId);
 updateDoc(userRef, {
  isAdmin: true,
 })
  .then(() => {
   console.log("Admin privileges granted successfully");
  })
  .catch((error) => {
   console.error("Error granting admin privileges:", error);
  });
};

// Revoke admin privileges from a user
const revokeAdminPrivileges = (userId) => {
 const userRef = doc(db, "users", userId);
 updateDoc(userRef, {
  isAdmin: false,
 })
  .then(() => {
   console.log("Admin privileges revoked successfully");
  })
  .catch((error) => {
   console.error("Error revoking admin privileges:", error);
  });
};

export { grantAdminPrivileges, revokeAdminPrivileges };
