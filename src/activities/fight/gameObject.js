import { BULLET_SPEED, DYING_DURATION, ENEMY_LIVES } from './constants';

export class GameObject {
	constructor(x, y, speedX, speedY) {
		this.x = x;
		this.y = y;
		this.speedX = speedX;
		this.speedY = speedY;
	}

	move() {
		this.x = this.x + this.speedX;
		this.y = this.y + this.speedY;
	}
}

export class BulletObject extends GameObject {
	constructor(x, y, type) {
		super(x, y, 0, BULLET_SPEED);
		this.type = type;
		this.touched = false;
	}
}

export class EnemyObject extends GameObject {
	constructor(x, y, speedX, speedY, type) {
		super(x, y, speedX, speedY);
		this.type = type;
		this.lives = ENEMY_LIVES;
		this.dying = false;
		this.effect = null;
	}

	die(effect) {
		this.dying = DYING_DURATION;
		this.effect = effect
	}
}
