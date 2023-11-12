import { HERO_SPEED } from '../constants';

export class Hero {
	constructor() {
		this.x = 0;
		this.y = 0;
		this.width = 20;
		this.height = 20;
	}

  set(x, y) {
    this.x = x;
    this.y = y;
  }

	left() {
		this.x = Math.max(this.x - HERO_SPEED, 0);
	}

	right(max) {
		this.x = Math.min(this.x + HERO_SPEED, max);
	}

	draw(ctx) {
		ctx.fillStyle = 'blue';
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}
