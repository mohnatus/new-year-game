import {
	CHANGE_GOLD,
	CHANGE_HEALTH,
	ADD_MEDICINE,
	CHANGE_PEARS,
	ADD_SLINGSHOT,
	EAT_PEAR,
	FINISH_DAY,
	NEXT_DAY,
	NEXT_STAGE,
	REMOVE_MEDICINE,
	RESET_STATE,
	APPLY_POWER,
	RESET_DAY,
	CHANGE_DAY,
	ADD_PET,
	CHANGE_COMPANION,
	CHANGE_MAGIC,
	CHANGE_WINE,
	ADD_PROMOCODE,
	ADD_LEARNING,
	ADD_PUZZLE,
	ADD_CIDER,
	SET_STAGE_DATA,
} from './actions';
import { defaultState } from './constants';

export const reducer = (state = defaultState, action) => {
	console.log({ state, action });

	switch (action.type) {
		case RESET_STATE:
			return defaultState;

		case RESET_DAY:
				return {
					...state,
					finishedDay: state.day - 1
				};

		case CHANGE_DAY:
			return {
				...state,
				day: state.day + action.payload,
				stage: 0,
			};

		case FINISH_DAY:
			return {
				...state,
				finishedDay: state.day,
			};

		case NEXT_DAY:
			return {
				...state,
				day: state.day + 1,
				finishedDay: state.day,
				stage: 0,
				health: state.health - 1,
			};

		case NEXT_STAGE:
			return {
				...state,
				stage: state.stage + 1,
			};

		case CHANGE_PEARS:
			return {
				...state,
				pears: state.pears + action.payload,
			};

		case EAT_PEAR:
			if (state.pears < 1) return state;

			if (state.health === 3) {
				if (state.power) return state;
				return {
					...state,
					power: true,
					pears: state.pears - 1,
				};
			}

			return {
				...state,
				pears: state.pears - 1,
				health: state.health + 1,
			};

		case CHANGE_GOLD:
			return {
				...state,
				gold: state.gold + action.payload,
			};

		case ADD_SLINGSHOT:
			return {
				...state,
				slingshot: true,
			};

		case ADD_MEDICINE:
			return {
				...state,
				medicine: true,
			};

		case REMOVE_MEDICINE:
			return {
				...state,
				medicine: false,
			};

		case CHANGE_HEALTH:
			return {
				...state,
				health: state.health + action.payload,
			};

		case APPLY_POWER:
			return {
				...state,
				power: false,
			};

		case ADD_CIDER:
			return {
				...state,
				cider: true,
			};

		case CHANGE_MAGIC:
			return {
				...state,
				magic: {
					...state.magic,
					[action.payload.magic]:
						state.magic[action.payload.magic] +
						action.payload.count,
				},
			};

		case ADD_PET:
			return {
				...state,
				pet: true,
			};

		case CHANGE_COMPANION:
			return {
				...state,
				companion: action.payload,
			};

		case CHANGE_WINE:
			return {
				...state,
				wine: state.wine + action.payload,
			};

		case ADD_PROMOCODE:
			return {
				...state,
				promocodes: [...state.promocodes, action.payload],
			};

		case ADD_LEARNING:
			return {
				...state,
				learning: [...state.learning, action.payload]
			}

		case ADD_PUZZLE:
			return {
				...state,
				puzzles: [...state.puzzles, action.payload]
			}

		case SET_STAGE_DATA:
			const { key, value } = action.payload || {}
			if (!key) return state;
			return {
				...state,
				stages: {
					...state.stages,
					[key]: value
				}
			}

		default:
			return state;
	}
};
