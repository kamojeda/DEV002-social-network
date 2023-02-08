/* import { get , getPosts, onGetPosts, collection, addPost } from "../Firebase/firestore.js";
import { db } from "../Firebase/firebaseConfig.js";
import { auth, viewer } from "../Firebase/firebase.js"; 
import { feed } from "../components/feed.js"; */

export const postPrint = (doc) => {
	let docs = doc.data();
	let postValue = `
    <div class = "postHeader" id = "idPostContent">    
    <div id = "userNamePost" class="userNamePost">${docs.user} </div>    
    <div class = "buttonsPosts" id = "idButtonsPosts${doc.id}" style= "display:none">
    <button class = "buttonDelete button-p" id = "buttonDelete-${doc.id}" data-id="${doc.id}">Eliminar</button>
    <button id = "buttonEdit-${doc.id}" class = "buttonEdit button-p" data-id="${doc.id}">Editar</button>
    </div>
    </div>
    <div id = "postContainer-${doc.id}" class= "postContainer">${docs.post} </div>
    <form id = "formEditTextArea-${doc.id}" class= "formEditTextArea" style= "display:none"> 
    <textArea id = "editTextArea-${doc.id}" class= "editTextArea" >${doc.post} </textArea>
    <button id = "buttonSaveEdit-${doc.id}" class = "buttonSaveEdit" data-id="${doc.id}">Guardar</button>
    </form>
    


    <div class = "buttonsLikePosts">
    <button class = "buttonLike" id = "buttonLike" data-id="${doc.id}">like</button>
    <span class = "likeCounter">${docs.likes.length}</span>
    </div>
    
    `; //console.log(doc.id)
	return postValue;
};

// const editPostTextArea = document.createElement("textArea");
// 					const saveButton = document.createElement("button");
// 					saveButton.textContent = "Guardar";
// 					postContent.appendChild(editPostTextArea);
// 					postContent.appendChild(saveButton);
