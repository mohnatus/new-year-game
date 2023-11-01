import { gameDay } from '../data/gameDay';
import { getStateFromLS, saveStateToLS } from './localStorage';

export function updateOldStateToNextVersion(saveState, defaultState) {
	const updatedState = {};

	Object.keys(defaultState).forEach((key) => {
		if (key in saveState) {
			updatedState[key] = saveState[key];
		} else {
			updatedState[key] = defaultState[key];
		}
	});

	return updatedState;
}

export function initState(defaultState) {
	const savedState = getStateFromLS();
	let currentState = defaultState;
	if (savedState) {
		const syncState = updateOldStateToNextVersion(savedState, defaultState);
		currentState = syncState;
	}
	if (currentState.day > gameDay) {
		currentState.day = gameDay;
	}
	if (currentState.finishedDay > gameDay) {
		currentState.finishedDay = gameDay;
	}
	if (currentState.finishedDay === currentState.day) {
		if (gameDay > currentState.day) {
			currentState.day = currentState.day + 1;
		}
	}

	saveStateToLS(currentState);
	return currentState;
}
