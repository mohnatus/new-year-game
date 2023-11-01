import { createContext, useContext, useEffect, useReducer } from 'react';
import { reducer } from './reducer';
import { initState } from './helpers';
import { defaultState } from './constants';
import { saveStateToLS } from './localStorage';

const savedState = initState(defaultState);
console.log({ savedState })

const AppStateContext = createContext(savedState);
const AppDispatchContext = createContext(() => {});

export function useAppState() {
	const ctx = useContext(AppStateContext);
	return ctx;
}

export function useAppDispatch() {
	const ctx = useContext(AppDispatchContext);
	return ctx;
}

export function Context({ children }) {
	const [state, dispatch] = useReducer(reducer, savedState);

	useEffect(() => {
		saveStateToLS(state);
	}, [state]);

	return (
		<AppDispatchContext.Provider value={dispatch}>
			<AppStateContext.Provider value={state}>
				{children}
			</AppStateContext.Provider>
		</AppDispatchContext.Provider>
	);
}
