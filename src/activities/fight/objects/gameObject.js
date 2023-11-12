export class GameObject {
	constructor(x, y, speedX, speedY) {
		this.x = x;
		this.y = y;
		this.speedX = speedX;
		this.speedY = speedY;
	}

	canMove() {
		return true;
	}

	move() {
		if (!this.canMove()) return;

		this.x = this.x + this.speedX;
		this.y = this.y + this.speedY;
	}
}
