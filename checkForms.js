export const checkForms = (buttonElement, textElement, nameElement) => {
	buttonElement.disabled = true;
	nameElement.addEventListener('input', () => {
		if ((nameElement.value === '') || (textElement.value === '')) {
			buttonElement.disabled = true;
			return;
		}
		else {
			buttonElement.disabled = false;
			return;
		}
	});

	textElement.addEventListener('input', () => {
		if ((textElement.value === '') || (nameElement.value === '')) {
			buttonElement.disabled = true;
			return;
		}
		else {
			buttonElement.disabled = false;
			return;
		}
	})
}