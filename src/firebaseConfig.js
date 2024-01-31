import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCK3xk1RQ72cEM0LhAcDFxGUp6nuEnJtIY",
  authDomain: "gogle-map-c971a.firebaseapp.com",
  projectId: "gogle-map-c971a",
  storageBucket: "gogle-map-c971a.appspot.com",
  messagingSenderId: "358040947265",
  appId: "1:358040947265:web:00bc0ad41b02f31e5494c0",
  measurementId: "G-Z0XBX3Z2E7"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);