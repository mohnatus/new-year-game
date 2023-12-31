export const FINISH_DAY = 'finish_day';
export const NEXT_DAY = 'next_day';
export const NEXT_STAGE = 'next_stage';
export const CHANGE_PEARS = 'change_pears';
export const EAT_PEAR = 'eat_pear';
export const CHANGE_GOLD = 'change_gold';
export const ADD_SLINGSHOT = 'add_slingshot';
export const ADD_GUN = 'add_gun';
export const ADD_MEDICINE = 'add_medicine';
export const REMOVE_MEDICINE = 'remove_medicine';
export const CHANGE_HEALTH = 'change_health';
export const FILL_HEALTH = 'fill_health'
export const LOSE_HEALTH = 'lose_health'
export const CHANGE_COMPANION = 'change_companion';
export const ADD_PET = 'add_pet';
export const APPLY_POWER = 'apply_power';
export const CHANGE_CIDER = 'change_cider';
export const CHANGE_MAGIC = 'change_magic';
export const CHANGE_WINE = 'change_wine';
export const ADD_PROMOCODE = 'add_promocode'
export const ADD_LEARNING = 'add_learning'
export const ADD_PUZZLE = 'add_puzzle'
export const SET_STAGE_DATA = 'set_stage_data'
export const BUY_ARMOR = 'buy_armor'
export const APPLY_PET = 'apply_pet'

export const RESET_STATE = 'reset_state';
export const RESET_DAY = 'reset_day';
export const CHANGE_DAY = 'change_day';

export function finishDay() {
	return {
		type: FINISH_DAY,
	};
}
export function nextDay() {
	return {
		type: NEXT_DAY,
	};
}

export function nextStage() {
	return {
		type: NEXT_STAGE,
	};
}

export function changePears(count) {
	return {
		type: CHANGE_PEARS,
		payload: count,
	};
}

export function eatPear() {
	return {
		type: EAT_PEAR,
	};
}

export function changeGold(count) {
	return {
		type: CHANGE_GOLD,
		payload: count,
	};
}

export function addSlingshot() {
	return {
		type: ADD_SLINGSHOT,
	};
}

export function addGun() {
	return {
		type: ADD_GUN,
	};
}

export function addMedicine() {
	return {
		type: ADD_MEDICINE,
	};
}

export function removeMedicine() {
	return {
		type: REMOVE_MEDICINE,
	};
}

export function changeHealth(count) {
	return {
		type: CHANGE_HEALTH,
		payload: count,
	};
}

export function fillHealth() {
	return {
		type: FILL_HEALTH,
	};
}

export function loseHealth() {
	return {
		type: LOSE_HEALTH,
	};
}

export function applyPower() {
	return {
		type: APPLY_POWER,
	};
}

export function changeCider(count) {
	return {
		type: CHANGE_CIDER,
		payload: count,
	};
}

export function changeMagic(magic, count) {
	return {
		type: CHANGE_MAGIC,
		payload:{ magic, count }
	};
}

export function changeCompanion(companion) {
	return {
		type: CHANGE_COMPANION,
		payload: companion,
	};
}

export function addPet() {
	return {
		type: ADD_PET,
	};
}

export function changeWine(count) {
	return {
		type: CHANGE_WINE,
		payload: count
	}
}

export function addPromocode(code) {
	return {
		type: ADD_PROMOCODE,
		payloayd: code
	}
}

export function addLearning(name) {
	return {
		type: ADD_LEARNING,
		payload: name
	}
}

export function addPuzzle(name) {
	return {
		type: ADD_PUZZLE,
		payload: name
	}
}

export function setStageData(key, value) {
	return {
		type: SET_STAGE_DATA,
		payload: { key, value }
	}
}

export function buyArmor(type, count) {
	return {
		type: BUY_ARMOR,
		payload: { type, count }
	}
}

export function applyPet() {
	return {
		type: APPLY_PET
	}
}

export function resetState() {
	return {
		type: RESET_STATE,
	};
}

export function resetDay() {
	return {
		type: RESET_DAY,
	};
}

export function changeDay(count) {
	return {
		type: CHANGE_DAY,
		payload: count,
	};
}
