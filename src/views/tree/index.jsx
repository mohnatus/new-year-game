import { useAppDispatch, useAppState, changePears } from "../../store";

export function Tree({ next }) {
  const dispatch = useAppDispatch()
  const state = useAppState()

  const handleClick = (count) => {
    dispatch(changePears(count))
    next()
  }

  return <div>
    Грушевое дерево
    <button onClick={() => handleClick(1)}>Собрать упавшие груши</button>
    {state.slingshot && <button onClick={() => handleClick(2)}>Сбить груши рогаткой</button>}
  </div>
}