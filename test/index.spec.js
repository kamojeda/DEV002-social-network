// importamos la funcion que vamos a testear
import {
	createUserWithEmailAndPassword,
	updateProfile,
	provider,
	signOut,
	signInWithPopup,
	signInWithEmailAndPassword,
} from "../src/Firebase/firebase.js";
import {
	auth,
	signInWithPass,
	getDisplayName,
	signUpWithPass,
	userSignedIn,
	viewer,
	logout,
	popUpGoogle,
} from "../src/firebase/auth-func.js";

jest.mock("../src/Firebase/firebase.js", () => {
	return {
		auth: jest.fn(() => {
			return { auth: "test" };
		}),
		createUserWithEmailAndPassword: jest.fn((email, password) => {
			if (!email || !password) {
				throw new Error("Campo de correo o contraseña vacíos");
			}
			if (email === "vacavegana@gmail.c") {
				throw new Error("Correo ingresado inválido");
			}
			if (email === "veganship@gmailcom") {
				return "Correo ingresado válido";
			}
			return Promise.resolve();
		}),
		signInWithEmailAndPassword: jest.fn((email, password) => {
			if (!email || !password) {
				throw new Error("Campo de correo o contraseña vacíos");
			}
			if (email === "vacavegana@gmail.c") {
				throw new Error("Correo ingresado inválido");
			}
			if (email === "veganship@gmailcom") {
				return "Correo ingresado válido";
			}
			return Promise.resolve();
		}),
	};
});

describe("Test de Crear cuenta con correo y contrseña", () => {
	const email = "veganship@gmailcom";
	const password = "prueba123456";

	it("Debe retornar un error de campo de correo vacío", async () => {
		try {
			await signUpWithPass(" ", password);
		} catch (error) {
			expect(error.code).toBe("Campo de correo o contraseña vacíos");
		}
	});

	it("Debe retornar un error de correo inválido", async () => {
		try {
			await signUpWithPass("vacavegana@gmail.c", password);
		} catch (error) {
			expect(error.code).toBe("Correo ingresado inválido");
		}
	});

	it("Debe retornar que el correo ingresado es válido", async () => {
		try {
			await signUpWithPass(email, password);
		} catch (error) {
			expect(error.code).toBe("Correo ingresado válido");
		}
	});
});

describe("Test de Inicio de sesión con correo y contraseña", () => {
	const email = "veganship@gmailcom";
	const password = "prueba123456";

	it("Debe retornar un error de campo de correo vacío", async () => {
		try {
			await signInWithPass(" ", password);
		} catch (error) {
			expect(error.code).toBe("Campo de correo o contraseña vacíos");
		}
	});

	it("Debe retornar un error de correo inválido", async () => {
		try {
			await signInWithPass("vacavegana@gmail.com", password);
		} catch (error) {
			expect(error.code).toBe("Correo ingresado inválido");
		}
	});

	it("Debe retornar que el correo ingresado es válido", async () => {
		try {
			await signInWithPass(email, password);
		} catch (error) {
			expect(error.code).toBe("Correo ingresado válido");
		}
	});
});
