const width = 40;
const height = 40;

const config = {
	width,
	height,
	draw(ctx, position) {
		ctx.fillStyle = 'green';
		ctx.fillRect(position.x, position.y, width, height);
	},
};

export default config;
