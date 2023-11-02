import { Game } from './game';
import { GameObject } from './gameObject';

export function init(canvasId, onFinish) {
	const canvas = document.getElementById(canvasId);
	const game = new Game(canvas);

	let wavesCounter = 0;
	let moment = performance.now();

	function getWave() {
		let x = wavesCounter % 2 ? 25 : 0;
		const wave = [];
		while (x < game.width) {
			const enemy = new GameObject(x, 0, 0, 1.25);
			wave.push(enemy);
			x += 70;
		}
		return wave;
	}

	canvas.addEventListener('click', () => {
		const bullet = new GameObject(
			Math.random() * game.width,
			game.height,
			Math.random() - 0.5,
			-1.25
		);

		game.addBullet(bullet);
	});

	const tick = () => {
		const currentMoment = performance.now();

		if (wavesCounter < 3) {
			if (currentMoment - moment >= 3000) {
				moment = currentMoment;
				const wave = getWave();
				game.addEnemies(wave, wavesCounter === 2);
				wavesCounter++;
			}
		}

		const gameStatus = game.tick();

		if (gameStatus) {
      onFinish(gameStatus)
			return;
		}

		requestAnimationFrame(tick);
	};

	tick();
}
