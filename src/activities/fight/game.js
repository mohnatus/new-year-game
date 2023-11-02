import bulletConfig from './bullet';
import enemyConfig from './enemy';
import { getCoords, hasIntersection } from './utils';

export class Game {
	constructor(canvas) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		this.width = canvas.width;
		this.height = canvas.height;

		this.enemies = [];
		this.bullets = [];

    this.allEnemies = false;
	}

	filterObjects() {
		this.enemies = this.enemies.filter((enemy) => {
			return !enemy.touched;
		});
		this.bullets = this.bullets.filter((bullet) => {
			const coords = getCoords(bulletConfig, bullet);
			if (bullet.touched) return false;
			const [left, top, right, bottom] = coords;
			if (bottom < 0) return false;
			if (left > this.width) return false;
			if (right < 0) return false;
			return true;
		});
	}

	move() {
		this.enemies.forEach((enemy) => enemy.move());
		this.bullets.forEach((bullet) => bullet.move());
	}

	markIntersections() {
		for (let i = 0; i < this.bullets.length; i++) {
			const bullet = this.bullets[i];
			for (let j = 0; j < this.enemies.length; j++) {
				const enemy = this.enemies[j];
				const bulletCoords = getCoords(bulletConfig, bullet);
				const enemyCoords = getCoords(enemyConfig, enemy);
				if (hasIntersection(bulletCoords, enemyCoords)) {
					this.onIntersection(bullet, enemy);
					break;
				}
			}
		}
	}

	checkBreakthrough() {
		for (let i = 0; i < this.enemies.length; i++) {
			const enemy = this.enemies[i];
			if (enemy.y >= this.height) {
				return true;
			}
		}

		return false;
	}

	draw() {
		this.clear();

		this.enemies.forEach((enemy) => {
			enemyConfig.draw(this.ctx, enemy);
		});

		this.bullets.forEach((bullet) => {
			bulletConfig.draw(this.ctx, bullet);
		});
	}

	clear() {
		this.ctx.clearRect(0, 0, this.width, this.height);
	}

	tick() {
		this.markIntersections();
		this.filterObjects();

		if (this.allEnemies && !this.enemies.length) {
			this.win();
			return 'win';
		}

		this.move();
		const isDefenceBroken = this.checkBreakthrough();

		if (isDefenceBroken) {
			this.lose();
			return 'lose';
		}

		this.draw();
    return false;
	}

	onIntersection(bullet, enemy) {
		bullet.touched = true;
		enemy.touched = true;
	}

	lose() {
		console.log('lose');
	}

	win() {
		console.log('win');
	}

	addEnemies(enemies, lastWave) {
		this.enemies.push(...enemies);
    this.allEnemies = lastWave
	}

	addBullet(bullet) {
		this.bullets.push(bullet);
	}
}
