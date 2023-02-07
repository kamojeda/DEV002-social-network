import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signOut,
	GoogleAuthProvider,
	onAuthStateChanged,
	updateProfile,
	signInWithPopup,
	signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

import {
	getFirestore,
	getDoc,
	getDocs,
	doc,
	collection,
	deleteDoc,
	updateDoc,
	addDoc,
	onSnapshot,
	serverTimestamp,
	query,
	orderBy,
	arrayUnion,
	arrayRemove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

import firebaseConfig from "./firebaseconfig.js";

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

export {
	createUserWithEmailAndPassword,
	signOut,
	GoogleAuthProvider,
	onAuthStateChanged,
	updateProfile,
	signInWithPopup,
	signInWithEmailAndPassword,
	getFirestore,
	getDoc,
	getDocs,
	doc,
	collection,
	deleteDoc,
	updateDoc,
	addDoc,
	onSnapshot,
	serverTimestamp,
	query,
	orderBy,
	arrayUnion,
	arrayRemove,
};
