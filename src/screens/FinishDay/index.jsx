import { Paper } from "../../components/Paper";
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

  const actions = [
      isNextDayAvailable ? { text: 'Перейти к следующему', onClick: handleNextDay} : {text: 'Ждите завтра'}
    ]

  return <div className={s.Finish}>
    <Paper text='Очередной день путешествия завершен.' actions={actions} />
  </div>
}