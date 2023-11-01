import { useAppDispatch, useAppState, changeHealth, removeMedicine } from "../../../../store"

export function Insect({ next }) {
  const state = useAppState()
  const dispatch = useAppDispatch()

  const handleTakeMedicine = () => {
    dispatch(removeMedicine())
    next()
  }

  const handleBite = () => {
    dispatch(changeHealth(-1))
    next()
  }

  return <div>Насекомое жалит героя

    <div>
      Вас атаковало ядовитое насекомое

      {state.medicine ? <button onClick={handleTakeMedicine}>Принять лекарство</button> : <button onClick={handleBite}>Потерять здоровье</button>}
    </div>
  </div>
}