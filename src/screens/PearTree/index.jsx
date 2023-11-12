import { learnings } from "../../data/learnings";
import { useAppDispatch, useAppState, changePears } from "../../store";
import { addLearning } from "../../store/actions";
import { Story } from "../Story";

import s from './style.module.css'

export function PearTree({ data, onFinish }) {
  const dispatch = useAppDispatch()
  const { power, slingshot, learning } = useAppState()

  const handleFinishLearning = (key) => {
    dispatch(addLearning(key))
  }

  const handleClick = (count) => {
    dispatch(changePears(count))
    onFinish()
  }

  return <div className={s.Tree}>
    <div className={s.Actions}>

      <button onClick={() => handleClick(1)}>Собрать упавшие груши</button>
      {slingshot && <button onClick={() => handleClick(2)}>Сбить груши рогаткой</button>}
      {power && <button onClick={() => handleClick(3)}>Потрясти дерево</button>}
    </div>

    {!learning.includes('tree') && <Story bg="top" slides={learnings.tree} onFinish={() => handleFinishLearning('tree')} />}
    {!learning.includes('treeSling') && slingshot && <Story bg="top" slides={learnings.treeSling} onFinish={() => handleFinishLearning('treeSling')} />}
    {!learning.includes('treePower') && power && <Story bg="top" slides={learnings.treePower} onFinish={() => handleFinishLearning('treePower')} />}
  </div>
}