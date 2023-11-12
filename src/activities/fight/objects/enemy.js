import { DYING_DURATION, ENEMY_LIVES, ENEMY_SPEED_DIFF } from '../constants';
import { GameObject } from './gameObject';

const width = 40;
const height = 40;

export class EnemyObject extends GameObject {
	constructor(x, y, speedX, speedY, type) {
		super(x, y, speedX, speedY);
		this.type = type;
		this.lives = ENEMY_LIVES;
		this.dying = false;
		this.effect = null;
	}

	hit(damage) {
		this.lives = this.lives - damage;
		this.speedY -= ENEMY_SPEED_DIFF;
		if (this.lives <= 0) this.die('killed');
	}

	die(effect) {
		this.dying = DYING_DURATION;
		this.effect = effect;
	}

	canMove() {
		if (this.dying) return false;
		if (this.lives <= 0) return false;
		return true;
	}
}

export const enemyConfig = {
	width,
	height,
	draw(ctx, object) {
		ctx.fillStyle = 'green';
		if (object.lives <= 4) ctx.fillStyle = 'yellow';
		if (object.lives <= 2) ctx.fillStyle = 'red';

		if (object.dying) ctx.fillStyle = 'pink';

		ctx.fillRect(object.x, object.y, width, height);
	},
};
