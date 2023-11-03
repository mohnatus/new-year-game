import { useAppState } from './store';
import { gameDay } from './data/gameDay';

import { Died } from './screens/Died';
import { Game } from './screens/Game';
import { NoGame } from './screens/NoGame';

function App() {
	const state = useAppState();

	if (gameDay === -1) {
		return <NoGame />
	}

	if (state.health < 0) {
		return <Died />
	}

	return (
		<Game />
	);
}

export default App;
