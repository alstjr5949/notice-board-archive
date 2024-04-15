import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDfjYKnflleOCL1DkXSnnoVAc1K6Xc1qL4",
  authDomain: "board-archive.firebaseapp.com",
  projectId: "board-archive",
  storageBucket: "board-archive.appspot.com",
  messagingSenderId: "358035222947",
  appId: "1:358035222947:web:964c40d0f1c72809872a16",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
