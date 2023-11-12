import { AIR, FIRE, GROUND, WATER } from "../constants/magic";

export const defaultState = {
	day: 0,
	stage: 0,
	finishedDay: -1,

	health: 1,
	force: false,
	pears: 0,

	gold: 0,
	wine: 0,
	cider: 0,

	slingshot: false,
	gun: false,
	medicine: false,
	armor: false,

	companion: false,
	pet: false,
	petUsed: false,

	magic: {
		[WATER]: 0,
		[FIRE]: 0,
		[AIR]: 0,
		[GROUND]: 0
	},

	wheel: null,

	promocodes: [],
	learning: [],
	puzzles: [],

	stages: {}

};
