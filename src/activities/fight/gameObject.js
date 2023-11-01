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
