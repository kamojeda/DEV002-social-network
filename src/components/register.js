import { toNavigate } from "../main.js";
import { auth } from "../Firebase/firebase.js";
import { signUpWithPass, updateProfile } from "../Firebase/auth-func.js";

export const register = () => {
	//Creamos elementos de para el formulario de registro

	const registerDiv = document.createElement("div");
	const containerRegister = document.createElement("section");
	const containerRegisterTitle = document.createElement("h1");
	const containerLogoRegister = document.createElement("figure");
	const imgLogoRegister = document.createElement("img");
	const containerRegisterForm = document.createElement("div");
	const registerForm = document.createElement("form"); //formulario

	//Nombre
	const labelUserName = document.createElement("label");
	const inputUserName = document.createElement("input");
	const paragraphNameError = document.createElement("p");

	//Ciudad
	const labelUserCity = document.createElement("label");
	const inputUserCity = document.createElement("input");
	const paragraphCityError = document.createElement("p");

	//País
	const labelUserCountry = document.createElement("label");
	const inputUserCountry = document.createElement("input");

	//Mail
	const labelUserMail = document.createElement("label");
	const inputUserMail = document.createElement("input");
	const paragraphRegisterMailError = document.createElement("p");

	//Contraseña y Verificación Contraseña
	const labelUserPass = document.createElement("label");
	const inputUserPass = document.createElement("input");
	const paragraphRegisterPassError = document.createElement("p");
	const labelUserCheckPass = document.createElement("label");
	const inputUserCheckPass = document.createElement("input");
	const paragraphCheckPassError = document.createElement("p");

	//Selector
	const selectIsVegan = document.createElement("select");
	selectIsVegan.id = "selectVegan";
	const labelSelectVegan = document.createElement("label");
	const selectOption = document.createElement("option");
	const optionOne = document.createElement("option");
	const optionTwo = document.createElement("option");
	const optionThree = document.createElement("option");
	const optionFour = document.createElement("option");
	const optionFive = document.createElement("option");

	selectOption.setAttribute("selected", "");
	selectOption.setAttribute("value", "0");
	optionOne.setAttribute("value", "1");
	optionTwo.setAttribute("value", "2");
	optionThree.setAttribute("value", "3");
	optionFour.setAttribute("value", "4");
	optionFive.setAttribute("value", "5");

	selectOption.innerHTML = "Elige una opción";
	optionOne.innerHTML = "Sí, soy vegano";
	optionTwo.innerHTML = "Soy vegetarian@";
	optionThree.innerHTML = "No, pero lo intento";
	optionFour.innerHTML = "No, pero alguien cercano sí";
	optionFive.innerHTML = "Me interesa saber más";

	selectIsVegan.appendChild(selectOption);
	selectIsVegan.appendChild(optionOne);
	selectIsVegan.appendChild(optionTwo);
	selectIsVegan.appendChild(optionThree);
	selectIsVegan.appendChild(optionFour);
	selectIsVegan.appendChild(optionFive);

	const buttonRegister = document.createElement("button");

	//Clases y Placeholder
	registerDiv.className = "register-div";
	containerRegisterTitle.textContent = "Regístrate";
	containerLogoRegister.className = "container-logo-register";
	imgLogoRegister.src = "../img/sandia-logo.png";
	imgLogoRegister.className = "img-logo-register";
	containerRegister.className = "container-register";
	containerRegisterForm.className = "container-register-form";
	registerForm.className = "register-form";

	labelUserName.className = "userName labels-r";
	labelUserName.textContent = "Nombre de Usuario";
	inputUserName.className = "input-Name-User";
	inputUserName.placeholder = "Juanita";
	paragraphNameError.className = "paragraph-name-error hide-error-message";

	labelUserCity.className = "userCity labels-r";
	labelUserCity.textContent = "Ciudad, País";
	inputUserCity.className = "input-City-User";
	inputUserCity.placeholder = "Lima, Perú";
	paragraphCityError.className = "paragraph-city-error hide-error-message";

	labelUserMail.className = "userMail labels-r";
	labelUserMail.textContent = "Correo electrónico";
	inputUserMail.type = "email";
	inputUserMail.className = "input-Mail-User";
	inputUserMail.placeholder = "example@gmail.com";
	paragraphRegisterMailError.className =
		"paragraph-register-mail-error hide-error-message";

	labelUserPass.className = "userPassword labels-r";
	labelUserPass.textContent = "Contraseña";
	inputUserPass.type = "password";
	inputUserPass.className = "input-Pass-User";
	inputUserPass.placeholder = "***************";
	paragraphRegisterPassError.className =
		"paragraph-register-pass-error hide-error-message";

	labelUserCheckPass.className = "userCheckPass labels-r";
	labelUserCheckPass.textContent = "Verificar contraseña";
	inputUserCheckPass.type = "password";
	inputUserCheckPass.className = "input-Check-Pass";
	inputUserCheckPass.placeholder = "***************";
	paragraphCheckPassError.className =
		"paragraph-check-pass-error hide-error-message";

	labelSelectVegan.className = "label-user-select labels-r";
	labelSelectVegan.textContent = "¿Eres vegano?";

	buttonRegister.className = "button-Register";
	buttonRegister.textContent = "Crear cuenta";

	registerDiv.appendChild(containerRegister);
	containerRegister.appendChild(containerLogoRegister);
	containerLogoRegister.appendChild(imgLogoRegister);
	containerRegister.appendChild(containerRegisterTitle);
	containerRegister.appendChild(containerRegisterForm);
	containerRegisterForm.appendChild(registerForm);

	registerForm.appendChild(labelUserName);
	registerForm.appendChild(inputUserName);
	registerForm.appendChild(paragraphNameError);
	registerForm.appendChild(labelUserCity);
	registerForm.appendChild(inputUserCity);
	registerForm.appendChild(paragraphCityError);
	registerForm.appendChild(labelUserMail);
	registerForm.appendChild(inputUserMail);
	registerForm.appendChild(paragraphRegisterMailError);
	registerForm.appendChild(labelUserPass);
	registerForm.appendChild(inputUserPass);
	registerForm.appendChild(paragraphRegisterPassError);
	registerForm.appendChild(labelUserCheckPass);
	registerForm.appendChild(inputUserCheckPass);
	registerForm.appendChild(paragraphCheckPassError);
	registerForm.appendChild(labelSelectVegan);
	registerForm.appendChild(selectIsVegan);
	registerForm.appendChild(buttonRegister);

	buttonRegister.addEventListener("click", () => {
		registerForm.addEventListener("submit", (e) => {
			e.preventDefault(); //cancela comportamiento por defecto de refrescar la pagina
			const emailForm = inputUserMail.value;
			const passwordForm = inputUserPass.value;
			const checkPassForm = inputUserCheckPass.value;
			const nameForm = inputUserName.value;
			const cityForm = inputUserCity.value;

			if (nameForm) {
				console.log(nameForm);
				signUpWithPass(auth, emailForm, passwordForm, nameForm)
					.then(() => {
						updateProfile(auth.currentUser, { nameForm });
						toNavigate("/registerOk");
					})
					.catch((error) => {
						console.log(error + ": ERROR");

						if (error.code === "auth/invalid-email") {
							paragraphRegisterMailError.textContent = "Ingrese un correo válido";
							paragraphRegisterMailError.style = "display: block";
						} else if (error.code === "auth/email-already-in-use") {
							paragraphRegisterMailError.textContent =
								"El correo ya se encuentra registrado. Puedes iniciar sesión.";
							paragraphRegisterMailError.style = "display: block";
						} else if (error.code === "auth/weak-password") {
							paragraphRegisterPassError.textContent =
								"Ingrese una contraseña de 6 a más dígitos.";
							paragraphRegisterPassError.style = "display: block";
						} else if (error.code) {
							return alert("Por favor, complete los datos de registro.");
						}
					});
			} else {
				paragraphNameError.textContent = "Ingrese un nombre de usuario";
				paragraphNameError.style = "display: block";
			}
		});
	});
	return registerDiv;
};
