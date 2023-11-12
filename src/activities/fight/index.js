import { STATUS } from '../../constants/fight';
import { bulletConfig, BulletObject } from './objects/bullet';
import { ENEMY_SPEED, WAVES_COUNT, WAVES_PAUSE } from './constants';
import { enemyConfig, EnemyObject } from './objects/enemy';
import { getCoords, hasIntersection } from './utils';
import { Hero } from './objects/hero';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;

const hero = new Hero();
let moveDirection = 0;

const settings = {
	waves: WAVES_COUNT,
	enemy: '',
	bg: '',
	bullet: '',
	damage: 2,
};

const objects = {
	enemies: [],
	bullets: [],
};

const state = {
	currentWave: 0,
};

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
		enemy.move();
	});
	objects.bullets.forEach((bullet) => {
		bullet.move();
	});
	if (moveDirection === -1) {
		hero.left();
	} else if (moveDirection === 1) {
		hero.right(width);
	}
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
				enemy.hit(settings.damage);
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

	hero.draw(ctx);

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
		return STATUS.win;
	}

	moveObjects();
	const isDefenceBroken = hasBreakthrought();

	if (isDefenceBroken) {
		return STATUS.lose;
	}

	draw();
	return false;
}

function nextWave() {
	if (state.currentWave >= settings.waves) return;

	let count = state.currentWave % 2 ? 5 : 4;
	let step = width / count;
	let i = 0;
	const wave = [];
	while (i < count) {
		const x = step / 2 + i * step;
		const enemy = new EnemyObject(x, 0, 0, ENEMY_SPEED);
		wave.push(enemy);
		i++;
	}

	objects.enemies.push(...wave);
	state.currentWave++;
}

export function killEnemies(count, effect) {
	objects.enemies.slice(0, count).forEach((e) => {
		e.die(effect);
	});
}

export function shot() {
	const bullet = new BulletObject(hero.x, hero.y);
	objects.bullets.push(bullet);
}

export function move(direction) {
	moveDirection = direction;
}

function keydownHandler(e) {
	switch (e.code) {
		case 'ArrowLeft':
			move(-1);
			break;
		case 'ArrowRight':
			move(1);
			break;
		case 'Space':
		case 'Enter':
			shot();
			break;
		default:
			break;
	}
}

function keyupHandler(e) {
	switch (e.code) {
		case 'ArrowLeft':
			if (moveDirection === -1) move(0)
			break
		case 'ArrowRight':
			if (moveDirection === 1) move(0)
			break;
		default:
			break;
	}
}

export function init(onFinish, localSettings = {}) {
	const rect = canvas.getBoundingClientRect();
	width = rect.width;
	height = rect.height;
	canvas.width = width;
	canvas.height = height;

	hero.set(width / 2, height - 50);

	document.addEventListener('keydown', keydownHandler);
	document.addEventListener('keyup', keyupHandler);

	clearCanvas();
	resetState();

	let moment = performance.now();

	const tickWrapper = () => {
		const currentMoment = performance.now();

		if (state.currentWave < settings.waves) {
			if (
				state.currentWave === 0 ||
				currentMoment - moment >= WAVES_PAUSE
			) {
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
