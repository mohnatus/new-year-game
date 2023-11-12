import { Paper } from "../../components/Paper"
import { eatPear, useAppDispatch, useAppState } from "../../store"

import s from './style.module.css'

export function Health({ onClose }) {
  const dispatch = useAppDispatch()
  const state = useAppState()

  const handleEatPear = () => {
    dispatch(eatPear())
    onClose()
  }

  return <div className={[s.Health, 'fullscreen', 'touchable'].join(' ')}>
    <Paper text='Здоровье 0. Вы щас умрете' actions={[
      { text: 'Съесть грушу', disabled: state.pears < 1, onClick: handleEatPear },
    ]}  />
    <button onClick={onClose}>Закрыть</button>
  </div>
}