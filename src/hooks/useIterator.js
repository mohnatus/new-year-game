import { useCallback, useEffect, useState } from 'react';

export function useIterator(array) {
	const [index, setIndex] = useState(0);
	const [isFinished, setIsFinished] = useState(false);

	const element = array[index];

	const next = useCallback(() => {
		setIndex((prev) => Math.min(prev + 1, array.length));
	}, [array.length]);

	useEffect(() => {
		if (index >= array.length - 1) setIsFinished(true);
	}, [array.length, index]);

	return { index, element, next, isFinished };
}
