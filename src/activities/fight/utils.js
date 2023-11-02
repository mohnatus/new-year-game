export function getCoords(config, position) {
	return [
		position.x,
		position.y,
		config.width + position.x,
		config.height + position.y,
	];
}

export function hasIntersection(coords1, coords2) {
	if (coords1[2] < coords2[0]) return;
	if (coords1[0] > coords2[2]) return;
	if (coords1[1] > coords2[3]) return;
	if (coords1[3] < coords2[1]) return;

	return true;
}
