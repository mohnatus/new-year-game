const width = 10;
const height = 30;

const Bullet = {
	width,
	height,
	draw(ctx, position) {
		ctx.fillStyle = 'red';
		ctx.fillRect(position.x, position.y, width, height);
	},
};

export { Bullet };
