
/*
  TODO: обновление количество страниц при переполнении
  TODO: красить кнопку текущей страницы (готово)
  TODO: приклеить пагинацию к низу
  TODO: проверка на заполнение форм (готово)
*/

const COMMENTS_ON_PAGE = 5;

const formElements = {
  commentsList: document.querySelector('.comments'),
  pagination: document.querySelector('.pagination'),
  totalComments: document.querySelector('.total'),
}
/*init form*/
const form = document.forms[0];
/**/
form.elements.submit.addEventListener('click', addCommentListener);

/* список комментариев */
let commentList = [];
let currentPage = 0;

/*выгрузка из localStorage, если там есть информация*/
if(localStorage.getItem('comments')){
  commentList = JSON.parse(localStorage.getItem('comments'));
  const PAGES = Math.ceil(commentList.length/COMMENTS_ON_PAGE);
  formElements.totalComments.innerHTML = `${commentList.length} комментариев`;
  for(let i = 0; i < PAGES; i++) {
    createPage(i);
  }
  displayComments(commentList)
}


function createPage (pageNum) {
  const classes = pageNum === currentPage ? 'page btn btnActive' : 'page btn'
  formElements.pagination.innerHTML += `
      <li class="pageLi"><button class='${classes}'>${pageNum+1}</button></li>
    `
  const pageButton = document.querySelectorAll('.page');
  pageButton.forEach(function (page, i) {
    page.addEventListener('click', changePageListener)
  })
}

function changePageListener() {
  const pageNum = +this.innerHTML;
  let start = (pageNum - 1) * COMMENTS_ON_PAGE;
  let end = start + COMMENTS_ON_PAGE;

  let comments = commentList.slice(start, end);
  if(currentPage !== pageNum) {
    changeButtonStyle(this)
  }

  displayComments(comments)
}

function changeButtonStyle (btn) {
  let currentBtn = formElements.pagination.querySelectorAll('.page')[currentPage];
  currentBtn.className = 'page btn';
  btn.className = 'page btn btnActive';
  currentPage = +btn.innerHTML-1;
}

function addCommentListener() {
  const date = '' + getCurrentDate();
  const newComment = {
    username: form.elements.username.value,
    comment: form.elements.comment.value,
    date: date
  }

  if(newComment.username.length > 0 && newComment.comment.length > 0) {
    commentList.unshift(newComment);
    displayComments(commentList);
    localStorage.setItem('comments', JSON.stringify(commentList));
  }

}

function displayComments(commentList) {
  let displayComment = '';
  commentList.forEach(function (item, i) {
    if(i < COMMENTS_ON_PAGE){
      displayComment += `
      <li class="commentsItem">
          <p class="usernameLable">${item.username}<span class="commentDate">${item.date}</span></p>
          <p class="commentLable">${item.comment}</p>
      </li>
      `;
    }
    formElements.commentsList.innerHTML = displayComment;
  })
}
function getCurrentDate() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();

  const hours = String(today.getHours()).padStart(2, '0');
  const minutes = String(today.getMinutes()).padStart(2, '0');

  return hours + ":" + minutes + " | "  + dd + "/" + mm;
}
