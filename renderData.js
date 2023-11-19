import { ulElement } from "./varibales.js";

export const answerToComment = () => {
    const textElement = document.querySelector('.add-form-text')
    const commentsToAnswer = document.querySelectorAll('.comment');
    const commentsToAnswerText = document.querySelectorAll('.comment-text');
    const commentsToAnswerName = document.querySelectorAll('.comment-name');
    commentsToAnswer.forEach((el, index) => {
        el.addEventListener("click", () => {
            textElement.value = `${commentsToAnswerText[index].textContent}  ${commentsToAnswerName[index].textContent}`
        });
    })
}

const delay = (interval = 300) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    })
}

const likes = (commentsArray) => {
    const likeButtons = document.querySelectorAll('.like-button');
    for (const likeButton of likeButtons) {
        likeButton.addEventListener('click', (event) => {
            event.stopPropagation();
            likeButton.classList.add("loadingLike");
            delay(2000)
                .then(() => {
                    likeButton.classList.remove("loadingLike");
                    const index = likeButton.dataset.index;
                    if (commentsArray[index].isLiked === false) {
                        commentsArray[index].paint = '-active-like';
                        commentsArray[index].likes += 1;
                        commentsArray[index].isLiked = true;
                    } else {
                        commentsArray[index].paint = '';
                        commentsArray[index].likes -= 1;
                        commentsArray[index].isLiked = false;
                    }
                    renderData(commentsArray);
                    likes();
                })
        });
    };
};

export const renderData = (commentsArray) => {
  const renderComments = () => {
    return (ulElement.innerHTML = commentsArray
      .map((item, index) => {
        return ` <li class="comment">
          <div class="comment-header">
            <div class='comment-name'>${item.author}</div>
            <div>${item.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${item.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${item.likes}</span>
              <button data-index='${index}' class="like-button ${item.paint}"</button>
            </div>
          </div>
        </li>
    `})
      .join(''));
  }
    
renderComments();
likes(commentsArray);
answerToComment();
};

export const renderHtmlAuth = () => {
	const appElement = document.getElementById('app');
	const loginHtml = `
		<div class="container">
		<div class="add-form-login">
			<input id="login" type="text" class="add-form-name-login" placeholder="Введите логин" value="admin" />
			<input id="password" type="password" class="add-form-name-login" placeholder="Введите пароль" value="admin" />
			<div class="add-form-row">
				<button id="buttonLogin" class="add-form-button-login">Написать</button>
			</div>
		</div>
	</div>
		`;
	appElement.innerHTML = loginHtml;

}

export const renderHtmlFormComments = () => {
	const formElement = document.getElementById('form-comments');
	const formHtml = `
		<div class="add-form">
		<input id="inputName" type="text" class="add-form-name" value="${nameUser}" readonly/>
		<textarea id="inputText" type="textarea" class="add-form-text" placeholder="Введите ваш коментарий"
			rows="4"></textarea>
		<div class="add-form-row">
			<button id="buttonPush" class="add-form-button">Вход</button>
		</div>
		`
	formElement.innerHTML = formHtml;
	document.createElement("ul");
}

export let token;
export const setToken = (newToken) => {
	token = newToken;
}

export let nameUser;
export const setNameUser = (newUser) => {
	nameUser = newUser;
}