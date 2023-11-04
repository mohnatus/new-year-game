import { useEffect, useRef } from 'react';
import { puzzles as puzzlesList } from '../data/puzzles';
import { useAppDispatch, useAppState } from '../store';
import { addPuzzle } from '../store/actions';

export function usePuzzle() {
	const dispatch = useAppDispatch();
	const { puzzles } = useAppState();
	const puzzle = useRef();

	useEffect(() => {
		if (puzzle.current) return;

		const allPuzzles = Object.keys(puzzlesList);
		const availablePuzzles = allPuzzles.filter(
			(key) => !puzzles.includes(key)
		);
		const randomIndex = Math.floor(Math.random() * availablePuzzles.length);
		const puzzleName = availablePuzzles[randomIndex];
		puzzle.current = puzzlesList[puzzleName];
		dispatch(addPuzzle(puzzleName));
	}, [dispatch, puzzles]);

	return puzzle;
}
