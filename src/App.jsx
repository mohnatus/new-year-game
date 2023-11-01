import { useCallback } from 'react';

import { gameDay } from './data/gameDay';
import { days } from './data/game';
import { View } from './views';
import { useAppDispatch, useAppState, eatPear, finishDay, nextDay, nextStage } from './store';
import { Info } from './components/info';
import { Wheel } from './components/wheel';

function App() {
	const state = useAppState();
	const dispatch = useAppDispatch();

	const day = days[state.day];
	const { stages, ending } = day;
	const isEnding = state.stage >= stages.length;
	const stage = isEnding ? ending : stages[state.stage]

	const handleNextStage = useCallback(() => {
		dispatch(nextStage())
	}, [dispatch])

	const handleNextDay = useCallback(() => {
		if (state.day < gameDay) {
			dispatch(nextDay())
		} else {
			dispatch(finishDay())
		}

	}, [dispatch, state.day])

	const handleEatPear = () => {
		dispatch(eatPear())
	}

	if (gameDay === -1) {
		return <div><Info />
			<hr />Здесь ничего нет</div>;
	}

	if (state.health < 0) {
		return <div><Info />
			<hr />Вы умерли</div>
	}

	return (
		<div className='App'>
			<Wheel />
			<Info />
			<hr />
			<div>
				{state.health < 1 && state.pears > 0 && <div>
					Вы скоро умрете от голода
					<br />
					<button onClick={handleEatPear}>съесть грушу</button>
				</div>}
				{state.health < 0 && state.pears < 1 && <div>Вы умерли от голода</div>}
			</div>
			<hr />
			<View stage={stage} dayIndex={state.day} stageIndex={state.stage} isEnding={isEnding} next={handleNextStage} />
			{isEnding && <button onClick={handleNextDay}>NEXT DAY</button>}
		</div>
	);
}

export default App;
