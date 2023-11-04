import { changeHealth, removeMedicine, useAppDispatch, useAppState } from "../../../../store"

export function Medicine({ onFinish }) {
  const { medicine } = useAppState()
  const dispatch = useAppDispatch()

  const handleTakeMedicine = () => {
    dispatch(removeMedicine())
    onFinish()
  }

  const handleLoseHealth = () => {
    dispatch(changeHealth(-1))
    onFinish()
  }

  return <div>
    <button disabled={!medicine} onClick={handleTakeMedicine}>Принять лекарство</button>
    <button onClick={handleLoseHealth}>Потерять здоровье</button>
  </div>
}