
/*
TODO: Форма имени и отзыва
TODO: Список
TODO: Пагинация по 10
TODO: Сохранение локально
*/


const addUsername = document.querySelector('.usernameInput');
const addCommentBtn = document.querySelector('.addComment');
const addComment = document.querySelector('.commentInput');
const comments = document.querySelector('.comments');
let commentList = [];

if(localStorage.getItem('comments')){
  commentList = JSON.parse(localStorage.getItem('comments'));
  displayComments();
}

addCommentBtn.addEventListener('click', function(){
  let newComment = {
    username: addUsername.value,
    comment: addComment.value
  }

  commentList.push(newComment);
  displayComments();

  localStorage.setItem('comments', JSON.stringify(commentList))
})

function displayComments() {
  let displayComment = '';
  commentList.forEach(function (item, i) {
    displayComment += `
    <li class="commentsItem">
        <p class="usernameLable">${item.username}</p>
        <p class="commentLable">${item.comment}</p>
    </li>
    `;
    comments.innerHTML = displayComment;
  })
}

