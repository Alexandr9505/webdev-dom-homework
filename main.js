import { getApi, postApi } from "./apiData.js";
import { getCorrectDate } from "./dateFunction.js";
import { renderData } from "./renderData.js";
import { checkForms } from "./checkForms.js";
import { sentComment } from "./sentComment.js";
import {
	nameElement,
	textElement,
	buttonElement,
	ulElement,
	preLoaderText
} from "./varibales.js";

let commentsArray = [];

preLoaderText.textContent = "Загрузка комментариев ...";
const getFetchApi = () => {
	getApi()
		.then((response) => {
			const getApiComments = response.comments.map((comment) => {
				return {
					author: comment.author.name,
					date: getCorrectDate(comment.date),
					likes: comment.likes,
					isLiked: false,
					text: comment.text,
				};
			});
			commentsArray = getApiComments;
			renderData(ulElement, commentsArray)
		})
		.then((response) => {
			preLoaderText.textContent = "";
			preLoaderText.classList.remove("margin");
		});
};

getFetchApi();

checkForms(buttonElement, textElement, nameElement);

buttonElement.addEventListener('click', () => {
	//Отправляю комментарий
	sentComment(buttonElement, preLoaderText);
	postApi(nameElement, textElement)
		.then((response) => {
			if (response.status === 400) {
				preLoaderText.textContent = "";
				throw new Error(alert("Короткое сообщение"));
			} else if (response.status === 500) {
				preLoaderText.textContent = "";
				throw new Error(alert("Ошибка сервера"));
			} else {
				nameElement.value = '';
				textElement.value = '';
				return getFetchApi();
			}
		})
		.catch((error) => {
            console.log(error);
            if (error.message === "Короткое сообщение") {
                alert("Имя и комментарий должны быть длиннее 3 символов")
            }

            if (error === "Failed to fetch") {
                preLoaderText.textContent = "";
                alert("Интернет не доступен, попробуйте позже");
            } else {
                console.warn(error);
            }
        })
    
        .finally(() => {
            buttonElement.disabled = false;
        })
    })