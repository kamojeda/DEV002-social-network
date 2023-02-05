/* import { get , getPosts, onGetPosts, collection, addPost } from "../Firebase/firestore.js";
import { db } from "../Firebase/firebaseConfig.js";
import { auth, viewer } from "../Firebase/firebase.js"; 
import { feed } from "../components/feed.js"; */

export const postPrint = (doc) => {
	let docs = doc.data();
	let postValue = `
    <div class = "postContent" id = "idPostContent">
    <div id = "userNamePost" class="userNamePost"> usuario ${docs.user} </div>
    <div id = "postContainer" class= "postContainer"> contenido del post ${docs.post} </div>
    </div>
    <form id = "formEditTextArea" class= "formEditTextArea" style= "display:none"> 
    <textArea id = "editTextArea" class= "editTextArea" > contenido del post ${doc.post} </textArea>
    <button class = "buttonSaveEdit" id = "buttonSaveEdit" data-id="${doc.id}">Guardar</button>
    </form>
    
    <div class = "buttonsPosts">
    <button class = "buttonDelete button-p" data-id="${doc.id}">Eliminar</button>
    <button class = "buttonEdit button-p" data-id="${doc.id}">Editar</button>
    <button class = "buttonLike" data-id="${doc.id}">like</button>

    </div>
    `; //console.log(doc.id)
	return postValue;
};

// const editPostTextArea = document.createElement("textArea");
// 					const saveButton = document.createElement("button");
// 					saveButton.textContent = "Guardar";
// 					postContent.appendChild(editPostTextArea);
// 					postContent.appendChild(saveButton);
