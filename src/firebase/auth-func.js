import {
	auth,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	provider,
	signOut,
	signInWithPopup,
	signInWithEmailAndPassword,
	updateProfile,
} from "./firebase.js";

//Crear Usuario
export const signUpWithPass = (auth, email, password, displayName) => {
	return createUserWithEmailAndPassword(auth, email, password);
	// .then((userCredential) => {
	// 	updateProfile(auth.currentUser, { displayName });
	// 	return userCredential;
	// })
	// .catch((error) => {
	// 	console.error(error + ": ERROR");
	// });
};
export const getDisplayName = (userNameFromRegister) =>
	updateProfile(auth.currentUser, {
		displayName: userNameFromRegister,
	});
export const signInWithPass = async (auth, email, password) =>
	await signInWithEmailAndPassword(auth, email, password);

//obtener currentUser
export const userSignedIn = () => auth.currentUser;

export const currentUser = {};
export const viewer = () => {
	onAuthStateChanged(auth, (user) => {
		if (user) {
			currentUser.email = user.email;
			currentUser.uid = user.uid;
			currentUser.displayName = user.displayName;
			currentUser.userName = user.userName;
			currentUser.userCity = user.userCity;
			console.log("user logged in " + user.email);
		} else {
			console.log("user logged out ");
		}
	});
};

export const logout = (auth) => signOut(auth);
export const popUpGoogle = (auth, provider) => signInWithPopup(auth, provider);

export { updateProfile };
