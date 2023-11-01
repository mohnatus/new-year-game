import { Bullet } from './bullet';
import { Enemy } from './enemy';
import { Game } from './game';
import { GameObject } from './gameObject';

function getCoords(config, position) {
	return [
		position.x,
		position.y,
		config.width + position.x,
		config.height + position.y,
	];
}
function hasIntersection(coords1, coords2) {
	if (coords1[2] < coords2[0]) return;
	if (coords1[0] > coords2[2]) return;
	if (coords1[1] > coords2[3]) return;
	if (coords1[3] < coords2[1]) return;

	return true;
}

export function init(canvasId) {
	const canvas = document.getElementById(canvasId);
	const game = new Game(canvas);

	let wavesCounter = 0;
	let moment = performance.now();

	let enemies = [];
	let bullets = [];

	function getWave() {
		let x = wavesCounter % 2 ? 25 : 0;
		const wave = [];
		while (x < game.width) {
			const enemy = new GameObject(x, 0, 0, 0.25);
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
		console.log(bullet);
		bullets.push(bullet);
	});

	const tick = () => {
		const currentMoment = performance.now();

		if (wavesCounter < 3) {
			if (currentMoment - moment >= 5000) {
				moment = currentMoment;
				const wave = getWave();
				enemies.push(...wave);
				wavesCounter++;
			}
		}

		game.clear();

		let stop = false;

		enemies = enemies.filter((e) => !e.touched);
    bullets = bullets.filter((b) => !b.touched && b.y > 0);

    if (!enemies.length && wavesCounter >= 3) {
      console.log('win')
      return
    }

		enemies.forEach((enemy) => {
			if (enemy.y > game.height) stop = true;

			enemy.move();
			Enemy.draw(game.ctx, enemy);
		});



		bullets.forEach((bullet) => {
			bullet.move();
			Bullet.draw(game.ctx, bullet);
		});

		for (let i = 0; i < bullets.length; i++) {
			const bullet = bullets[i];
			for (let j = 0; j < enemies.length; j++) {
				const enemy = enemies[j];
				const bulletCoords = getCoords(Bullet, bullet);
				const enemyCoords = getCoords(Enemy, enemy);
				if (hasIntersection(bulletCoords, enemyCoords)) {
					bullet.touched = true;
					enemy.touched = true;
				}
				if (bullet.touched) break;
			}
		}

		if (stop) {
			return;
		}

		requestAnimationFrame(tick);
	};

	tick();
}
