import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCZk2QwCoUiEZJh48Qe-jSc1oiyvbDc4eM",
    authDomain: "hotel-management-eceff.firebaseapp.com",
    projectId: "hotel-management-eceff",
    storageBucket: "hotel-management-eceff.appspot.com",
    messagingSenderId: "497230227150",
    appId: "1:497230227150:web:4d93e2ef5e06344038d29f",
    measurementId: "G-W5JVPZJGG3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;