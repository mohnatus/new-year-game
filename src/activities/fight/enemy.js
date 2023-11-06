const width = 40;
const height = 40;

const config = {
	width,
	height,
	draw(ctx, object) {
		ctx.fillStyle = 'green';
		if (object.lives <= 4) ctx.fillStyle = 'yellow';
		if (object.lives <= 2) ctx.fillStyle = 'red';

		if (object.dying) ctx.fillStyle = 'pink'

		ctx.fillRect(object.x, object.y, width, height);
	},
};

export default config;
