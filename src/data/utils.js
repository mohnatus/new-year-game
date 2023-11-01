import { STATE_DURATION } from "../constants/settings";
import { STATES } from "../constants/states";
import { VIEWS } from "../constants/views";

export function heroGoes() {
	return { view: VIEWS.state, variant: STATES.go, duration: STATE_DURATION };
}
export function tree(learning) {
	return { view: VIEWS.tree, learning: learning };
}
export function going() {
	return { view: VIEWS.state, variant: STATES.go };
}
export function sleeping() {
	return { view: VIEWS.state, variant: STATES.sleep };
}
export function heroPrepareToGo() {
	return { view: VIEWS.state, variant: STATES.toGo };
}
export function heroPrepareToSleep() {
	return { view: VIEWS.state, variant: STATES.toSleep };
}
export function tale(variant) {
  return { view: VIEWS.tale, variant }
}
export function fight(variant, param) {
  return { view: VIEWS.fight, variant, power: param === 'power', gun: param === 'gun' }
}
export function obstacle(variant, param) {
  return { view: VIEWS.obstacle, variant, power: param === 'power', needHelp: param === 'help' }
}
export function crossroad(magic) {
  return { view: VIEWS.crossroad, magic }
}