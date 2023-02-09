//import { app } from '../Firebase/firebaseConfig.js';
import {
	getFirestore,
	db,
	auth,
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
} from "./firebase.js";

export const userCollection = () => getDocs(collection(db, "usuarios"));
export const postCollection = () => getDocs(collection(db, "posts"));
export const getPost = (id) => getDoc(doc(db, "documents", id));
export const getPosts = () => getDocs(collection(db, "documents"));
export const getPostData = (id) => getDoc(doc(db, "documents", id));
export const deletePost = (id) => deleteDoc(doc(db, "documents", id));
export const onGetPosts = (callback) =>
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

export const giveLike = (docId, newLike) => {
	updateDoc(doc(db, "documents", docId), {
		likes: arrayUnion(newLike),
	});
};

export const dislike = (docId, oldLike) => {
	updateDoc(doc(db, "documents", docId), {
		likes: arrayRemove(oldLike),
	});
};

export const updatePost = (id, newDocPost) =>
	updateDoc(doc(db, "posts", id), newDocPost);

export { collection, onSnapshot, query, orderBy, doc, getFirestore };
