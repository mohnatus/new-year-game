import { useEffect, useRef } from 'react';
import { puzzles as puzzlesList } from '../data/puzzles';
import { useAppDispatch, useAppState } from '../store';
import { addPuzzle } from '../store/actions';

export function usePuzzle() {
	const dispatch = useAppDispatch();
	const { puzzles } = useAppState();
	const puzzleName = useRef();

	if (!puzzleName.current) {
		const allPuzzles = Object.keys(puzzlesList);
		const availablePuzzles = allPuzzles.filter(
			(key) => !puzzles.includes(key)
		);
		const randomIndex = Math.floor(Math.random() * availablePuzzles.length);
		puzzleName.current = availablePuzzles[randomIndex];
	}

	useEffect(() => {
		dispatch(addPuzzle(puzzleName.current));
	}, [dispatch]);

	return puzzlesList[puzzleName.current];
}
