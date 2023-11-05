export const getApi = () => {
	return fetch(
		"https://wedev-api.sky.pro/api/v1/:Alexandr-Aleshin/comments",
		{
			method: "GET",
		}
	)
		.then((response) => {
			return response.json();
		});
};

export const postApi = (nameElement, textElement) => {
	return fetch("https://wedev-api.sky.pro/api/v1/:Alexandr-Aleshin/comments", {
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
	});
};