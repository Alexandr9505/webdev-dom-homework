import {
	hostApiAuth,
} from "./varibales.js";
import { token, } from "./renderData.js";

export const getApi = () => {
	return fetch(
		"https://wedev-api.sky.pro/api/v2/:Alexandr-Aleshin/comments",
		{
			method: "GET",
		}
	)
		.then((response) => {
			return response.json();
		});
};

export const postApi = (nameElement, textElement) => {
	return fetch("https://wedev-api.sky.pro/api/v2/:Alexandr-Aleshin/comments", {
		method: "POST",
		body: JSON.stringify({
			forceError: true,
			name: nameElement.value
				.replaceAll("<", "&lt;")
				.replaceAll(">", "&gt;"),
			text: textElement.value
				.replaceAll("<", "&lt;")
				.replaceAll(">", "&gt;"),
		}),
        headers: {
			Authorization: `Bearer ${token}`
		}
	});
};

export const loginUser = ({ loginInputElement, passwordInputElement }) => {
	return fetch(hostApiAuth, {
		method: "POST",
		body: JSON.stringify({
			login: loginInputElement.value,
			password: passwordInputElement.value,
		})
	}).then((response, event) => {
		if (response.status === 400) {
			alert("Передан неправильный логин или пароль");
			event.stopPropagation();
		} else {
			return response.json();
		}
	})
}