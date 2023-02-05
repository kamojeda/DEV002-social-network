//import { app } from '../Firebase/firebaseConfig.js';
import { db } from "../Firebase/firebaseConfig.js";
import {
	getFirestore,
	getDoc,
	getDocs,
	doc,
	setDoc,
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

import { auth } from "./firebase.js";

export const userCollection = () => getDocs(collection(db, "usuarios"));
export const postCollection = () => getDocs(collection(db, "posts"));
export const getPost = (id) => getDoc(doc(db, "documents", id));
export const getPosts = () => getDocs(collection(db, "documents"));
export const deletePost = (id) => deleteDoc(doc(db, "documents", id));
export const onGetPosts = (callback) =>
	onSnapshot(collection(db, "documents"), callback);
export const onGetDates = (q, callback) =>
	onSnapshot(collection(db, "documents"), callback);
export const editPost = (id, newPost) =>
	updateDoc(doc(db, "documents", id), newPost);
export const addPost = (post) =>
	addDoc(collection(db, "documents"), {
		post,
		user: auth.currentUser.displayName,
		uid: auth.currentUser.uid,
		likes: [],
		createdAt: serverTimestamp(),
	});

export const savePost = (postContent, location) =>
	addDoc(postCollection, {
		postContent,
		location,
	});

//export const getPosts = () => getDocs(postCollection);
//export const onGetPosts = (callback) => onSnapshot(postCollection, callback);

export const giveLike = (id, newLike) => {
	updateDoc(doc(db, "documents", id), {
		likes: arrayUnion(newLike),
	});
	// .then(() => console.log("+1 like"))
	// .catch((error) => console.error("Error", error));
};

export const dislike = (id, oldLike) => {
	updateDoc(doc(db, "documents", id), {
		likes: arrayRemove(oldLike),
	});
};

export const updatePost = (id, newDocPost) =>
	updateDoc(doc(db, "posts", id), newDocPost);

export { collection, onSnapshot, db, query, orderBy, doc };
