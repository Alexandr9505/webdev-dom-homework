export const sentComment = (buttonElement, preLoaderText) => {
	preLoaderText.textContent = "Комментарий публикуется...";
	buttonElement.disabled = true;
}