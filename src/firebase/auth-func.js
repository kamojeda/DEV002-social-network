import {
	auth,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	provider,
	signOut,
	signInWithPopup,
	signInWithEmailAndPassword,
} from "./firebase.js";
//Crear Usuario
export const signUpWithPass = async (email, password, displayName) => {
	return await createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in
			updateProfile(auth.currentUser, { displayName });
			return userCredential;
		})
		.catch((error) => {
			console.log(error.code);
			console.log(error.message);
		});
};
export const getDisplayName = (userNameFromRegister) =>
	updateProfile(auth.currentUser, {
		displayName: userNameFromRegister,
	});
export const signInWithPass = (auth, email, password) =>
	signInWithEmailAndPassword(auth, email, password);

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
