import bulletConfig from './bullet';
import { BULLET_SPEED, ENEMY_LIVES, ENEMY_SPEED, WAVES_COUNT, WAVES_PAUSE } from './constants';
import enemyConfig from './enemy';
import { GameObject } from './gameObject';
import { getCoords, hasIntersection } from './utils';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;

const settings = {
	waves: WAVES_COUNT,
	enemy: '',
	bg: '',
	bullet: '',
	damage: 2
};

const objects = {
	enemies: [],
	bullets: [],
};

const state = {
	currentWave: 0,
};

export const WIN = 'status/win'
export const LOSE = 'status/lose'

function clearCanvas() {
	ctx.clearRect(0, 0, width, height);
}

function resetState() {
	state.currentWave = 0;

	objects.enemies = [];
	objects.bullets = [];
}

function handleObjects() {
	objects.enemies = objects.enemies.filter((enemy) => {
		if (enemy.dying) {
			enemy.dying--;
			if (enemy.dying === 0) return false;
		}

		if (enemy.lives === 0) return false;

		return true;
	});

	objects.bullets = objects.bullets.filter((bullet) => {
		const coords = getCoords(bulletConfig, bullet);
		if (bullet.touched) return false;
		const [left, top, right, bottom] = coords;
		if (bottom < 0) return false;
		if (left > width) return false;
		if (right < 0) return false;
		return true;
	});
}

function moveObjects() {
	objects.enemies.forEach((enemy) => {
		if (enemy.dying) return;
		enemy.move();
	});
	objects.bullets.forEach((bullet) => {
		if (bullet.touched) return;
		bullet.move();
	});
}

function handleIntersections() {
	for (let i = 0; i < objects.bullets.length; i++) {
		const bullet = objects.bullets[i];
		if (bullet.touched) return;
		for (let j = 0; j < objects.enemies.length; j++) {
			const enemy = objects.enemies[j];
			if (enemy.dying) return;
			const bulletCoords = getCoords(bulletConfig, bullet);
			const enemyCoords = getCoords(enemyConfig, enemy);
			if (hasIntersection(bulletCoords, enemyCoords)) {
				bullet.touched = true;
				enemy.lives = enemy.lives - settings.damage;
				break;
			}
		}
	}
}

function hasBreakthrought() {
	for (let i = 0; i < objects.enemies.length; i++) {
		const enemy = objects.enemies[i];
		if (enemy.y >= height) {
			return true;
		}
	}

	return false;
}

function draw() {
	clearCanvas();

	objects.enemies.forEach((enemy) => {
		enemyConfig.draw(ctx, enemy);
	});

	objects.bullets.forEach((bullet) => {
		bulletConfig.draw(ctx, bullet);
	});
}

function tick() {
	handleIntersections();
	handleObjects();

	if (state.currentWave === settings.waves && objects.enemies.length === 0) {
		return WIN;
	}

	moveObjects();
	const isDefenceBroken = hasBreakthrought();

	if (isDefenceBroken) {
		return LOSE;
	}

	draw();
	return false;
}

function nextWave() {
	if (state.currentWave >= settings.waves) return;

	let x = state.currentWave % 2 ? 25 : 0;
	const wave = [];
	while (x < width) {
		const enemy = new GameObject(x, 0, 0, ENEMY_SPEED);
		enemy.lives = ENEMY_LIVES;
		wave.push(enemy);
		x += 70;
	}

	objects.enemies.push(...wave);
	state.currentWave++;
}

export function killEnemies(count, effect) {
	objects.enemies.slice(0, count).forEach((e) => {
		e.effect = effect;
		e.killing = 5;
	});
}

export function shot() {
	const bullet = new GameObject(
		Math.random() * width,
		height,
		Math.random() - 0.5,
		BULLET_SPEED
	);

	objects.bullets.push(bullet);
}

export function init(onFinish, localSettings = {}) {
	clearCanvas();
	resetState();

	let moment = performance.now();

	const tickWrapper = () => {
		const currentMoment = performance.now();

		if (state.currentWave < settings.waves) {
			if (state.currentWave === 0 || currentMoment - moment >= WAVES_PAUSE) {
				moment = currentMoment;
				nextWave();
			}
		}

		const gameStatus = tick();

		if (gameStatus) {
			onFinish(gameStatus);
			return;
		}

		requestAnimationFrame(tickWrapper);
	};

	tickWrapper();
}
