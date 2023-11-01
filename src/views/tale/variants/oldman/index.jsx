import { useAppDispatch, useAppState, addMedicine } from "../../../../store"

export function Oldman({ next }) {
  const state = useAppState()
  const dispatch = useAppDispatch()

  const handleGetMedicine = (count) => {
    dispatch(addMedicine(1))
  }

  return <div>Встреча со стариком

    <div>
      Дай мне, пожалуйста, одну грушу
      <button disabled={state.pears < 1} onClick={() => handleGetMedicine(1)}>Отдать грушу</button>
      <button onClick={next}>Не отдавать</button>
    </div>

    <button onClick={next}>Next</button>
  </div>
}