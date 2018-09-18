class UI {
    constructor(){
        this.post       = document.querySelector('#posts');
        this.postBtn    = document.querySelector('.post-submit')
        this.titleInput = document.querySelector('#title');
        this.bodyInput  = document.querySelector('#body');
        this.idInput    = document.querySelector('#id');
        this.postSubmit = document.querySelector('#post-submit');
        this.cardForm   = document.querySelector('.card-form');
        this.forState   = 'add';
    }

    // <!------- METHODS ------->
    // Display posts to post div
    showPosts(posts){
        let output = '';
        posts.forEach(post => {
            output += `
                <div class="card mb-3">
                    <div class="card-body">
                        <h4 class="card-title">${post.title}</h4>
                        <p class="card-text">${post.body}</p>
                        <a href="#" class="edit card-link" data-id=${post.id}>
                            <i class="fas fa-edit"></i>
                        </a>
                        <a href="#" class="delete card-link" data-id=${post.id}>
                            <i class="fas fa-eraser"></i>
                        </a>
                    </div>
                </div>
            `;
        });

        this.post.innerHTML = output;
    };

    // Display alert before post div
    showAlert(message, className){
        if(document.querySelector('.alert')){document.querySelector('.alert').remove();}

        // Creating Div
        const tempDiv = document.createElement('div');
        tempDiv.className = className;
        tempDiv.appendChild(document.createTextNode(message));

        // Inserting Before Posts
        this.post.insertAdjacentElement('beforebegin', tempDiv);
        
        // Removing
        setTimeout(() => {
            this.clearAlert();
        }, 3000);
    };

    // Clear alert from ui JQuery used for fadeOut function
    clearAlert(){
        if(document.querySelector('.alert')){
            $('.alert').fadeOut(2000, "linear", () => {
                // Line add due to bug if multiple clicks were made
                if(document.querySelector('.alert')){document.querySelector('.alert').remove();}
            });
        }
    };

    clearFields(){
        this.titleInput.value = '';
        this.bodyInput.value = '';
    };

    clearIdInput(){
        this.idInput.value = '';
    }

    // Fill form to edit
    fillForm(data){
        this.titleInput.value = data.title;
        this.bodyInput.value = data.body;
        this.idInput.value = data.id;

        // Changing State
        this.changeFormState('edit');
    }

    // Change for state
    changeFormState(state){
        if(state === 'edit'){
            this.postBtn.textContent = 'Salvar Post';
            this.postBtn.className = 'post-submit btn btn-block btn-warning';

            // Create cancel button
            if(!document.querySelector('.post-cancel')){

                const cancelBtn = document.createElement('button');
                cancelBtn.className = 'post-cancel btn btn-block btn-secondary';
                cancelBtn.appendChild(document.createTextNode('Cancelar'));

                // Inserting it bellow post-submit
                this.postBtn.insertAdjacentElement('afterend', cancelBtn);   
            };

        }else{
            this.postBtn.textContent = 'Postar!';
            this.postBtn.className = 'post-submit btn btn-block btn-primary';
            // Remove cancelBtn
            if(document.querySelector('.post-cancel')){
                document.querySelector('.post-cancel').remove();
            }
            // Clear hidden id input
            this.clearIdInput();
            // Clear inputs
            this.clearFields();
        }
    }
}

// Making UI class exportable
export const ui = new UI();