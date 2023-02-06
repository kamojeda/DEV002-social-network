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
				throw new Error("Correo o Contraseña vacíos");
			}
			return Promise.resolve({ user: "admin" });
		}),
	};
});

describe("Test de Inicio de sesión", () => {
	const email = "veganship@gmail";
	const password = "prueba123456";

	it("debe retornar error de usuario no encontrado", async () => {
		try {
			await signInWithPass(email, password);
		} catch (error) {
			expect(error.code).toBe("usuario NO encontrado");
		}
	});

	it("debe retornar un error de contraseña incorrecta", async () => {
		try {
			await signInWithPass(email, password);
		} catch (error) {
			expect(error.code).toBe("contraseña incorrecta");
		}
	});
});
