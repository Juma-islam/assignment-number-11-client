import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
const firebaseConfig = {
  apiKey: "AIzaSyACCr4ks4z1gaUh9VvA3VlFHV8C5qL6s_A",
  authDomain: "garments-tracker-projects.firebaseapp.com",
  projectId: "garments-tracker-projects",
  storageBucket: "garments-tracker-projects.firebasestorage.app",
  messagingSenderId: "37255825196",
  appId: "1:37255825196:web:98618822bd67a684a00e89"
};

const app = initializeApp(firebaseConfig);
export default app;