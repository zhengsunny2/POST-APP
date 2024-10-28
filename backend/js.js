const addButton = document.querySelector('.btn-primary');  
const submitCommentButton = document.querySelector('.btn-success');  
const filterButton = document.querySelector('.btn-secondary'); 
const textInput = document.getElementById('textInput');  
const imageInput = document.getElementById('imageInput'); 
const commentInput = document.getElementById('commentInput'); 
const commentHistory = document.getElementById('commentHistory');  


let comments = [];

addButton.addEventListener('click', () => {
    const text = textInput.value;
    const imageFile = imageInput.files[0];
    if (!text && !imageFile) {
        alert('text ou image');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const imageSrc = e.target.result;
        const item = document.createElement('li');
        item.className = 'list-group-item';
        item.innerHTML = `
            <p>${text}</p>
            ${imageFile ? `<img src="${imageSrc}" alt="" style="max-width: 100%; height: auto;">` : ''}
        `;
        commentHistory.appendChild(item);
        textInput.value = '';
        imageInput.value = '';
    };
    if (imageFile) {
        reader.readAsDataURL(imageFile);
    } else {
        const item = document.createElement('li');
        item.className = 'list-group-item';
        item.innerHTML = `<p>${text}</p>`;
        commentHistory.appendChild(item);
        textInput.value = '';
    }
});


submitCommentButton.addEventListener('click', () => {
    const commentText = commentInput.value;
    if (!commentText) {
        alert('comment');
        return;
    }
    
    const currentDate = new Date();
    const comment = {
        text: commentText,
        date: currentDate,
    };
    comments.push(comment);
    displayComments(comments);
    commentInput.value = '';
});


filterButton.addEventListener('click', () => {
    comments.sort((a, b) => b.date - a.date);  
    displayComments(comments);
});


function displayComments(commentArray) {
    commentHistory.innerHTML = '';  
    commentArray.forEach(comment => {
        const item = document.createElement('li');
        item.className = 'list-group-item';
        item.innerHTML = `
            <p>${comment.text}</p>
            <small class="text-muted">${comment.date.toLocaleString()}</small>
        `;
        commentHistory.appendChild(item);
    });
}