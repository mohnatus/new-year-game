import { useAppDispatch, useAppState, applyPower, changeGold } from "../../store/"

export function Obstacle({ type, power, next }) {
  const state = useAppState()
  const dispatch = useAppDispatch()

  const handleGetByGold = (count) => {
    dispatch(changeGold(count))
    next()
  }

  const handlePower = () => {
    dispatch(applyPower())
    next()
  }

  const handleSolve = (count) => {
    dispatch(changeGold(count))
    next()
  }

  return <div>Препятствие
    {type}

    {state.gold > 0 && <button onClick={() => handleGetByGold(-1)}>Заплатить за переправу</button>}
    {state.power && <button onClick={handlePower}>Использовать силу</button>}
    <button onClick={() => handleSolve(1)}>Решить загадку</button>
  </div>
}