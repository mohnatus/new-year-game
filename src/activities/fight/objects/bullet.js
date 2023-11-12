import { BULLET_SPEED } from '../constants';
import { GameObject } from './gameObject';

const width = 10;
const height = 10;

export class BulletObject extends GameObject {
	constructor(x, y, type) {
		console.log('bullet', x, y)
		super(x, y, 0, BULLET_SPEED);
		this.type = type;
		this.touched = false;
	}

	canMove() {
		return !this.touched;
	}
}

export const bulletConfig = {
	width,
	height,
	draw(ctx, position) {
		ctx.fillStyle = 'red';
		ctx.fillRect(position.x, position.y, width, height);
	},
};
