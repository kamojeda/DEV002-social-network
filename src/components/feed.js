import { toNavigate } from "../main.js";
import { register } from "../components/register.js";
import { auth, logout, userSignedIn, viewer } from "../Firebase/firebase.js";
import {
	addPost,
	collection,
	db,
	onSnapshot,
	deletePost,
	onGetPosts,
	editPost,
	query,
	orderBy,
	onGetDates,
	giveLike,
	dislike,
	getPost,
	doc,
} from "../Firebase/firestore.js";
import { postPrint } from "../components/post.js";

export const feed = () => {
	//Creamos elementos del Feed
	const feedDiv = document.createElement("div");
	feedDiv.classList = "feedDiv";
	const header = document.createElement("div");

	const imgHeader = document.createElement("img");
	imgHeader.src = "../img/Logo VeganShip.png";
	imgHeader.classList = "imgHeader";

	const inputSearchHeader = document.createElement("input");
	inputSearchHeader.placeholder = "tu búsqueda";

	const buttonSignOut = document.createElement("button");
	buttonSignOut.textContent = "Cerrar Sesión";

	const newPostContainer = document.createElement("form");
	newPostContainer.classList = "newPostContainer";
	const newPostLocation = document.createElement("input");
	newPostLocation.placeholder = "ubicación";

	const newPostTag = document.createElement("input");
	newPostTag.placeholder = "etiquetas";

	const newPostInput = document.createElement("textarea");
	newPostInput.classList = "newPostContent";
	const newPostButton = document.createElement("button");
	newPostButton.textContent = "publicar";
	const postFeed = document.createElement("section");
	postFeed.className = "post-feed";

	feedDiv.appendChild(header);
	header.appendChild(imgHeader);
	header.appendChild(inputSearchHeader);
	header.appendChild(buttonSignOut);
	feedDiv.appendChild(newPostContainer);
	newPostContainer.appendChild(newPostLocation);
	newPostContainer.appendChild(newPostTag);
	newPostContainer.appendChild(newPostInput);
	newPostContainer.appendChild(newPostButton);
	feedDiv.appendChild(postFeed);

	let editPostStatus = false;
	let id = "";

	window.addEventListener("DOMContentLoaded", async () => {
		const queryRef = query(
			collection(db, "documents"),
			orderBy("createdAt", "desc")
		);
		console.log(queryRef);

		newPostContainer.addEventListener("submit", (e) => {
			e.preventDefault();
			const postContent = newPostInput.value;
			addPost(postContent);
			console.log(postContent);
			//console.log(contenidoPost)
			newPostContainer.reset();
		});

		onSnapshot(queryRef, (querySnapshot) => {
			postFeed.innerHTML = "";
			querySnapshot.forEach((item) => {
				const postDiv = document.createElement("div");
				//console.log(doc.data())
				postDiv.className = "postDiv";
				const printedPost = postPrint(item);
				postDiv.innerHTML = printedPost;
				postFeed.appendChild(postDiv);
				//postDiv.innerHTML += `
				//<div class = post"> ${doc.data().post}</div>
				//`
			});

			const userSignedId = userSignedIn().uid;

			const btnDelete = postFeed.querySelectorAll(".buttonDelete");
			btnDelete.forEach((btn) => {
				btn.addEventListener("click", async ({ target: { dataset } }) => {
					try {
						await deletePost(dataset.id);
					} catch (error) {
						console.log(error);
					}
				});
			});

			const btnEdit = postFeed.querySelectorAll(".buttonEdit");
			btnEdit.forEach((btn) => {
				btn.addEventListener("click", async (e) => {
					const doc = await onGetPosts(e.target.dataset.id);
					const postData = doc.data();
					// console.log(postData);
					const postArea = document.getElementById("postContainer");
					const editPostTextArea = document.getElementById("editTextArea");
					const formEditingArea = document.getElementById("formEditTextArea");
					const saveButton = document.getElementById("buttonSaveEdit");

					postArea.style.display = "none"; // to hide
					formEditingArea.style.display = "block"; // to show

					editPostTextArea.value = postData.post;
					editPostStatus = true;
					id = e.target.dataset.id;

					saveButton.addEventListener("click", (e) => {
						e.preventDefault();
						const postContent = editPostTextArea.value;
						// console.log(postContent);
						if (!editPostStatus) {
							addPost(postContent);
							// console.log(postContent);
						} else {
							editPost(id, { post: postContent });
							editPostStatus = false;
						}
						//console.log(contenidoPost)
						postArea.style.display = "block";
						formEditingArea.style.display = "none";
					});
				});
			});

			const btnLike = postFeed.querySelectorAll(".buttonLike");
			btnLike.forEach((btn) => {
				btn.addEventListener("click", async (e) => {
					try {
						const id = e.target.dataset.id;
						const dataPost = await getPost(id);
						const post = dataPost.data();
						console.log(id, userSignedId);

						const currentLike = post.likes.indexOf(userSignedId);
						console.log("post: ", post, "post.likes: ", post.likes);
						//console.log(currentLike)
						//console.log("dbLikes.lenght", dbLikes.length, "dbLikes"+dbLikes, "currentLike", currentLike)

						if (currentLike === -1) {
							//console.log("like funct")
							giveLike(id, userSignedId);
							console.log("boton like", currentLike + " currentLike");
						} else {
							console.log("dislike funct");
							dislike(id, userSignedId);
							console.log("boton dislike", currentLike + "currentLike");
						}
					} catch (error) {
						console.log("catch del error", error);
					}
				});
			});
		});
	});

	buttonSignOut.addEventListener("click", () => toNavigate("/"));
	buttonSignOut.addEventListener("click", async (e) => {
		e.preventDefault(); //cancela comportamiento por defecto de refrescar la pagina
		try {
			await logout(auth);
			toNavigate("/");
		} catch (error) {
			console.log(error);
		}
	});

	return feedDiv;
};
