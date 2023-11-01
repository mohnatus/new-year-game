import { useAppDispatch, useAppState, buyCider, changePears } from "../../../../store"

export function Kajit({ next }) {
  const state = useAppState()
  const dispatch = useAppDispatch()

  const handleBuyCider = (count) => {
    dispatch(buyCider(count))
  }

  const handleDenyKajit = (count) => {
    dispatch(changePears(count))
  }

  return <div>Встреча с каджитом
    <div>
      Дай мне три груши, я сварю сидр.
      <button disabled={state.pears < 3} onClick={() => handleBuyCider(3)}>Купить сидр</button>
      <button onClick={() => handleDenyKajit(-1)}>Не отдавать</button>
      <button onClick={next}>Идти дальше</button>
    </div>

  </div>
}