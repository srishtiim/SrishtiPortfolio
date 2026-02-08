import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyD0Kom2cAUOMVjS1DeVm0cr2p484U23L_M",
  authDomain: "portfolio-824db.firebaseapp.com",
  projectId: "portfolio-824db"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

async function saveMessage(message) {
  await addDoc(collection(db, "messages"), message);
}

window.saveMessage = saveMessage;
