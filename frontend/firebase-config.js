import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const firebaseConfig = {
    projectId: "prompt-wars-hackathon-493408"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
