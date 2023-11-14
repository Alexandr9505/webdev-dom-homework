import { getApi, postApi } from "./apiData.js";
import { getCorrectDate } from "./dateFunction.js";
import { renderData, renderHtmlAuth, token, setToken, renderHtmlFormComments, setNameUser } from "./renderData.js";
import { checkForms } from "./checkForms.js";
import { sentComment } from "./sentComment.js";
import { preLoaderText } from "./varibales.js";

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
			renderData(commentsArray)
		})
		.then((response) => {
			preLoaderText.textContent = "";
			preLoaderText.classList.remove("margin");
		});
};

getFetchApi();

const sendFormComments = () => {
	renderHtmlFormComments();
	const nameElement = document.getElementById("inputName");
	const textElement = document.getElementById("inputText");
	const buttonElement = document.getElementById("buttonPush");

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
    });
}

	const sendFormAuth = () => {
		renderHtmlAuth();
		const loginInputElement = document.getElementById("login");
		const passwordInputElement = document.getElementById("password");
		const buttonElement = document.getElementById("buttonLogin");
	
		buttonElement.addEventListener("click", () => {
			loginUser({ loginInputElement, passwordInputElement }).then((responseData) => {
				alert('Авторизация прошла успешно');
				setToken(responseData.user.token);
				setNameUser(responseData.user.name);
				console.log(token);
			}).then(() => {
				ulElement.style.display = "flex";
				document.getElementById("app").remove();
				sendFormComments()
				getFetchApi();
			});
		});
	}
	
	const loginLink = document.getElementById("authorization");
	loginLink.addEventListener("click", () => {
		sendFormAuth();
		ulElement.style.display = "none";
		document.getElementById("authorization").remove();
	})	