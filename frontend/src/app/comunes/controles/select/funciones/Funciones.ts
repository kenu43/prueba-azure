import { keyBoardType } from '../types/SelectTypes';

export const navigateOnArrow = (e: keyBoardType) => {
	const focusOption = document.activeElement;

	if (e.code === 'ArrowDown') {
		const nextElement = focusOption?.nextElementSibling?.id;
		document.getElementById(nextElement!)?.focus();
	}

	if (e.code === 'ArrowUp') {
		const beforeElement = Number(focusOption?.id);
		const newElementToFocus = beforeElement - 1;

		document.getElementById(newElementToFocus.toString()!)?.focus();
	}
};

export const expandOrHideOptions = (type: boolean, id: string) => {
	const element = document.getElementById(id);
	const svg = document.getElementsByName(id);

	if (type) {
		element?.setAttribute('role', 'presentation');

		svg?.forEach((el) => el.setAttribute('role', 'presentation'));
		svg?.forEach((el) => el.setAttribute('pointer-events', 'pointer'));
	} else {
		element?.setAttribute('role', 'combobox');

		svg?.forEach((el) => el.setAttribute('role', 'button'));
		svg?.forEach((el) => el.setAttribute('pointer-events', 'none'));
	}
};
