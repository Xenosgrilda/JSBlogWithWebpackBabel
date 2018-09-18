import { http } from './http';
import { ui }   from './ui';

// <!----- EVENT LISTENERS ------>
// Get posts on DOM Load
document.addEventListener('DOMContentLoaded', getPosts);
// Listen for Submit
ui.postBtn.addEventListener('click', submitPost);
// Listen for Delete
ui.post.addEventListener('click', deletePost);
// Listen for Edit State
ui.post.addEventListener('click', enableEdit);
// Using event delegation because post-cancel btn is not add when the dom is loaded
ui.cardForm.addEventListener('click', cancelEdit);


// Get Posts from http.js
function getPosts(){
    // async functions need a .then and .catch and those need a parameter to assign its events, similar to event from dom eventListeners functions
    http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

// Submit Posts from http.js
function submitPost(){
    // Getting values
    const title = ui.titleInput.value;
    const body  = ui.bodyInput.value;
    const id    = ui.idInput.value;

    // Creating data
    // ES6 syntax, if the key and the value is the same, the key is not needed
    const data = {
        title,
        body
    };

    // Validating input
    if(title !== '' && body !== '')
    {
        // Check for ID -> if id !== null then it's an update not an post
        if(id !== ''){
            // Create Post
            http.post('http://localhost:3000/posts', data)
            .then(() => {
                getPosts();
                ui.showAlert('Post Enviado', 'alert alert-success');
                ui.clearFields();
            })
            .catch(err => console.log(err));            
        }
        else{
            // Update Post
            http.put(`http://localhost:3000/posts/${id}`, data)
            .then(() => {
                getPosts();
                ui.showAlert('Post Atualizado', 'alert alert-warning');
                ui.changeFormState('add');
            })
            .catch(err => console.log(err));
        }
    }
    else
    {
        ui.showAlert('Seu Post precisa ter Titulo e Conteúdo', 'alert alert-danger');
    }
}

// Delete Post from http.js
function deletePost(event){
    if(event.target.parentElement.classList.contains('delete')){
        const id = event.target.parentElement.dataset.id;

        if(confirm('Você está certo disso?')){
            http.delete(`http://localhost:3000/posts/${id}`)
            .then(() => {
                ui.showAlert('Post Removido com Sucesso', 'alert alert-info');
                getPosts();
            })
            .catch(err => {console.log(err)});
        }
    }

    event.preventDefault();
}

// Enable Edit State
function enableEdit(event){
    if(event.target.parentElement.classList.contains('edit'))
    {
        // Getting the id
        const id = event.target.parentElement.dataset.id;
        // Getting the body and the title
        const title = event.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        const body = event.target.parentElement.previousElementSibling.textContent;
        
        // Allocating to data const 
        const data ={
            id,
            title,
            body
        }

        // Fill form with current post
        ui.fillForm(data);
    }

    event.preventDefault();
}

function cancelEdit(event){
    // Checking if there is a elment with post-cancel class
    if(event.target.classList.contains('post-cancel')){
        ui.changeFormState('add');
    }

    event.preventDefault();
}