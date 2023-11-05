import { learnings } from "../../data/learnings";
import { useAppDispatch, useAppState, changePears } from "../../store";
import { addLearning } from "../../store/actions";
import { Story } from "../Story";

export function PearTree({ data, onFinish }) {
  const dispatch = useAppDispatch()
  const { slingshot, learning } = useAppState()

  const handleFinishLearning = (key) => {
    dispatch(addLearning(key))
  }

  const handleClick = (count) => {
    dispatch(changePears(count))
    onFinish()
  }

  return <div>
    <div>
      Грушевое дерево
      <button onClick={() => handleClick(1)}>Собрать упавшие груши</button>
      {slingshot && <button onClick={() => handleClick(2)}>Сбить груши рогаткой</button>}
    </div>

    {!learning.includes('tree') && <Story slides={learnings.tree} onFinish={() => handleFinishLearning('tree')} />}

    {!learning.includes('treeSling') && slingshot && <Story slides={learnings.treeSling} onFinish={() => handleFinishLearning('treeSling')} />}
  </div>
}