import { gameDay } from "../../data/gameDay";
import { nextDay, useAppDispatch, useAppState } from "../../store"

export function FinishDay() {
  const state = useAppState();
  const dispatch = useAppDispatch()

  const isNextDayAvailable = gameDay > state.day;

  const handleNextDay = () => {
    dispatch(nextDay())
  }
  return <div>
    Очередной день путешествия завершен.
    {isNextDayAvailable ? <button onClick={handleNextDay}>Перейти к следующему</button> : <div>Ждите завтра</div>}
  </div>
}