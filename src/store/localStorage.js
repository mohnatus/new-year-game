const LS_KEY = 'pupyrka_new_year';

export function getStateFromLS() {
	const savedData = localStorage.getItem(LS_KEY);
	if (!savedData) return null;

	try {
		const parsedData = JSON.parse(savedData);
		return parsedData;
	} catch (e) {
		return null;
	}
}

export function saveStateToLS(state) {
	localStorage.setItem(LS_KEY, JSON.stringify(state));
}
