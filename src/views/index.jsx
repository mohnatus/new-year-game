
import { Fight } from "./fight";
import { State } from "./state";
import { Obstacle } from "./obstacle";
import { Tale } from "./tale"
import { Tree } from "./tree";
import { VIEWS } from "../constants/views";
import { Crossroad } from "./crossroad";

const Views = {
  [VIEWS.tale]: Tale,
  [VIEWS.tree]: Tree,
  [VIEWS.state]: State,
  [VIEWS.fight]: Fight,
  [VIEWS.obstacle]: Obstacle,
  [VIEWS.crossroad]: Crossroad
}

export function View({ stage, dayIndex, stageIndex, isEnding, next }) {

  const { view, variants, ...props } = stage;

  const ViewComponent = Views[view]

  return <div>
    <ViewComponent {...props} dayIndex={dayIndex} stageIndex={stageIndex} isEnding={isEnding} next={next} />
  </div>
}