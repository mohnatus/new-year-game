import { eatPear, useAppDispatch, useAppState } from "../../store"

import s from './style.module.css'

export function Health({ onClose }) {
  const dispatch = useAppDispatch()
  const state = useAppState()

  const handleEatPear = () => {
    dispatch(eatPear())
    onClose()
  }

  return <div className={s.Health}>
    <div className={s.Text}>
      <div className={s.Bg} />
      <div className={s.Content}>
        <div>
          Здоровье 0. Вы щас умрете
        </div>
        <div>
          <button disabled={state.pears < 1} onClick={handleEatPear}>Съесть грушу</button>
          <button onClick={onClose}>Закрыть</button>
        </div>
      </div>
    </div>


  </div>
}