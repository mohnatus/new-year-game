import { days } from './game';

// let start = new Date(2023, 11, 1);

const start = new Date();
start.setHours(0, 0, 0, 0);
start.setDate(start.getDate() - days.length + 1);

const finish = new Date(+start);
finish.setDate(finish.getDate() + days.length - 1);

const today = new Date();
today.setHours(0, 0, 0, 0);

let gameDay = -1;

if (today >= start && today <= finish) {
	const diff = today - start;
	gameDay = Math.floor(diff / 1000 / 60 / 60 / 24);
}

export { gameDay };
