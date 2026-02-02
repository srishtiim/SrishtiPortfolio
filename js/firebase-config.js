/* ========================================
   FIREBASE CONFIGURATION
   ======================================== */

// Firebase SDK imports (using CDN modules)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Firebase configuration
// NOTE: Replace these values with your actual Firebase project credentials
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "srishti-portfolio.firebaseapp.com",
    projectId: "srishti-portfolio",
    storageBucket: "srishti-portfolio.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase (only if config is set)
let app = null;
let db = null;

try {
    if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
        app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        console.log('Firebase initialized successfully');
    } else {
        console.log('Firebase not configured - using local data');
    }
} catch (error) {
    console.log('Firebase initialization skipped:', error.message);
}

// ============ FIRESTORE FUNCTIONS ============

/**
 * Save a contact form message to Firestore
 * @param {Object} message - Message object with name, email, subject, message
 * @returns {Promise<string>} - Document ID of the saved message
 */
async function saveMessage(message) {
    if (!db) {
        console.log('Message (local):', message);
        return 'local-' + Date.now();
    }

    try {
        const docRef = await addDoc(collection(db, 'messages'), {
            ...message,
            timestamp: serverTimestamp()
        });
        console.log('Message saved with ID:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error saving message:', error);
        throw error;
    }
}

/**
 * Fetch all projects from Firestore
 * @returns {Promise<Array>} - Array of project objects
 */
async function fetchProjects() {
    if (!db) {
        console.log('Using local projects data');
        return null;
    }

    try {
        const querySnapshot = await getDocs(collection(db, 'projects'));
        const projects = [];
        querySnapshot.forEach((doc) => {
            projects.push({ id: doc.id, ...doc.data() });
        });
        return projects;
    } catch (error) {
        console.error('Error fetching projects:', error);
        return null;
    }
}

/**
 * Fetch all skills from Firestore
 * @returns {Promise<Object>} - Skills object organized by category
 */
async function fetchSkills() {
    if (!db) {
        console.log('Using local skills data');
        return null;
    }

    try {
        const querySnapshot = await getDocs(collection(db, 'skills'));
        const skills = {
            programming: [],
            ai: [],
            tools: []
        };
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (skills[data.category]) {
                skills[data.category].push({ name: data.name, level: data.level });
            }
        });
        return skills;
    } catch (error) {
        console.error('Error fetching skills:', error);
        return null;
    }
}

// ============ FIREBASE SETUP INSTRUCTIONS ============
/*
To set up Firebase for this portfolio:

1. Go to https://console.firebase.google.com/
2. Create a new project named "srishti-portfolio"
3. Enable Firestore Database (Start in test mode for development)
4. Go to Project Settings > General > Your apps > Web
5. Register a web app and copy the config values
6. Replace the firebaseConfig values above with your actual credentials

Firestore Database Structure:

Collection: projects
├── Document: {
│     title: "News Summarizer",
│     category: "Deep Learning",
│     description: "...",
│     techStack: ["Python", "TensorFlow", ...],
│     features: ["Feature 1", "Feature 2", ...],
│     image: "URL to image",
│     githubLink: "https://github.com/...",
│     liveLink: "https://..."
│   }

Collection: skills
├── Document: {
│     name: "Python",
│     category: "programming", // or "ai" or "tools"
│     level: 5 // 1-5 rating
│   }

Collection: messages
├── Document: {
│     name: "Sender Name",
│     email: "sender@email.com",
│     subject: "Message Subject",
│     message: "Message content...",
│     timestamp: Timestamp
│   }

Security Rules (for production):
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to read projects and skills
    match /projects/{document=**} {
      allow read: if true;
      allow write: if false;
    }
    match /skills/{document=**} {
      allow read: if true;
      allow write: if false;
    }
    // Allow anyone to write messages (for contact form)
    match /messages/{document=**} {
      allow read: if false;
      allow write: if true;
    }
  }
}
*/

// Export functions for use in main.js
window.saveMessage = saveMessage;
window.fetchProjects = fetchProjects;
window.fetchSkills = fetchSkills;
