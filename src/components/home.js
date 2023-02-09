import { toNavigate } from "../main.js";
import { auth, provider } from "../Firebase/firebase.js";
import { signInWithPass, viewer, popUpGoogle } from "../Firebase/auth-func.js";

export const home = () => {
	const homeDiv = document.createElement("div");
	const containerHeader = document.createElement("header");
	const imgLogo = document.createElement("img");
	const containerForm = document.createElement("div");
	const loginForm = document.createElement("form");
	const labelMail = document.createElement("label");
	const inputMail = document.createElement("input");
	const paragraphMailError = document.createElement("p");
	const labelPassword = document.createElement("label");
	const inputPassword = document.createElement("input");
	const paragraphPassError = document.createElement("p");
	const buttonLogin = document.createElement("button");
	const containerGoogle = document.createElement("div");
	const iconLogoGoogle = document.createElement("i");
	const buttonGoogle = document.createElement("button");
	const containerRegisterHome = document.createElement("div");
	const labelRegister = document.createElement("label");
	const hrefRegister = document.createElement("a");

	homeDiv.className = "div-container";
	containerHeader.className = "container-header";
	imgLogo.src = "../img/Logo VeganShip.png";
	imgLogo.className = "img-logo";
	containerForm.className = "container-form";
	loginForm.className = "login-form";
	labelMail.className = "label-mail labels";
	labelMail.textContent = "Correo electrónico";
	inputMail.type = "email";
	inputMail.id = "i-input-login-mail";
	inputMail.className = "input-login-mail inputs";
	inputMail.placeholder = "tucorreo@gmail.com";
	inputMail.required = "true";
	paragraphMailError.className = "paragraph-mail-error hide-error-message";
	labelPassword.className = "label-pass labels";
	labelPassword.textContent = "Contraseña";
	inputPassword.type = "text";
	inputPassword.id = "i-input-login-password";
	inputPassword.className = "input-login-password inputs";
	inputPassword.placeholder = "***************";
	inputPassword.type = "password";
	inputPassword.required = "true";
	paragraphPassError.className = "paragraph-pass-error hide-error-message";
	buttonLogin.textContent = "Iniciar sesión";
	buttonLogin.className = "button-login buttons";
	containerGoogle.className = "container-google";
	iconLogoGoogle.id = "span-i";
	iconLogoGoogle.className = "fa-brands fa-google";
	buttonGoogle.textContent = "Continuar con Google";
	buttonGoogle.className = "button-google buttons";
	containerRegisterHome.className = "container-register-home";
	labelRegister.className = "label-reg labels";
	labelRegister.textContent = "¿No tienes una cuenta?";
	hrefRegister.textContent = "Regístrate";
	hrefRegister.className = "href-register";

	homeDiv.appendChild(containerHeader);
	containerHeader.appendChild(imgLogo);
	homeDiv.appendChild(containerForm);
	containerForm.appendChild(loginForm);
	loginForm.appendChild(labelMail);
	loginForm.appendChild(inputMail);
	loginForm.appendChild(paragraphMailError);
	loginForm.appendChild(labelPassword);
	loginForm.appendChild(inputPassword);
	loginForm.appendChild(paragraphPassError);
	loginForm.appendChild(buttonLogin);
	homeDiv.appendChild(containerGoogle);
	containerGoogle.appendChild(buttonGoogle);
	buttonGoogle.appendChild(iconLogoGoogle);
	homeDiv.appendChild(containerRegisterHome);
	containerRegisterHome.appendChild(labelRegister);
	containerRegisterHome.appendChild(hrefRegister);

	viewer();

	buttonLogin.addEventListener("click", () => {
		loginForm.addEventListener("submit", async (e) => {
			e.preventDefault();
			const emailLogin = inputMail.value;
			const passwordLogin = inputPassword.value;

			try {
				const userCredentials = await signInWithPass(
					auth,
					emailLogin,
					passwordLogin
				);
				console.log(userCredentials);
				toNavigate("/feed");
			} catch (error) {
				console.log(error.code);
				if (error.code === "auth/empty-email") {
					paragraphMailError.textContent = "Ingrese un correo";
					paragraphMailError.style = "display: block";
				} else if (error.code === "auth/invalid-email") {
					paragraphMailError.textContent = "Ingrese un correo válido";
					paragraphMailError.style = "display: block";
				} else if (error.code === "auth/user-not-found") {
					paragraphMailError.textContent =
						"El correo es incorrecto o no está registrado. Puedes registrarte ahora.";
					paragraphMailError.style = "display: block";
				} else {
					paragraphMailError.style = "display: none";
				}

				if (error.code === "auth/empty-password") {
					paragraphPassError.textContent = "Ingresa contraseña";
					paragraphPassError.style = "display: none";
				} else if (error.code === "auth/wrong-password") {
					paragraphPassError.textContent = "La contraseña es incorrecta";
					paragraphPassError.style = "display: block";
				} else if (error.code === "auth/weak-password") {
					paragraphPassError.textContent =
						"La contraseña debe tener más de 6 caracteres";
					paragraphPassError.style = "display: none";
				} else {
					paragraphPassError.style = "display: none";
				}
			}
		});
	});

	hrefRegister.addEventListener("click", () => toNavigate("/register"));
	buttonGoogle.addEventListener("click", async (e) => {
		e.preventDefault();

		try {
			const credentials = await popUpGoogle(auth, provider);
			console.log(credentials.user);
			toNavigate("/feed");
		} catch (error) {
			console.log(error);
		}
	});

	return homeDiv;
};
