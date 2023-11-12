import { gameDay } from "../../data/gameDay";
import { nextDay, useAppDispatch, useAppState } from "../../store"

import s from './style.module.css'

export function FinishDay() {
  const state = useAppState();
  const dispatch = useAppDispatch()

  const isNextDayAvailable = gameDay > state.day;

  const handleNextDay = () => {
    dispatch(nextDay())
  }
  return <div className={s.Finish}>
    <div className={s.Container}>
      <div className={s.Bg} />
      <div className={s.Content}>
        Очередной день путешествия завершен.
        {isNextDayAvailable ? <button onClick={handleNextDay}>Перейти к следующему</button> : <div>Ждите завтра</div>}
      </div>

    </div>

  </div>
}