import { useCallback, useState } from "react";
import { eatPear, resetState, useAppDispatch, useAppState } from "../../store";
import { changeDay, changeGold, changeHealth, changePears, changeWine, resetDay } from "../../store/actions";
import { Wheel } from "../Wheel";
import { Promocode } from "../Promocode";
import { AIR, FIRE, GROUND, WATER } from "../../constants/magic";

import s from './style.module.css'

export function Info() {
  const state = useAppState()
  const dispatch = useAppDispatch()

  const [showPromocode, setShowPromocode] = useState(false)

  const handleClosePromocode = useCallback(() => {
    setShowPromocode(false)
  }, [])

  const handleEatPear = () => {
    dispatch(eatPear())
  }

  return <div className={s.Info}>
    <Wheel />

    <div>
      <button onClick={() => dispatch(resetState())}>RESET</button>
      <button onClick={() => dispatch(resetDay())}>RESET DAY</button>
    </div>

    <div>Текущий день: {state.day}
      <button onClick={() => dispatch(changeDay(-1))}>-1</button>
      <button onClick={() => dispatch(changeDay(1))}>+1</button>
    </div>

    <div>Текущий слайд: {state.stage}</div>

    <div>Груши: {state.pears}
      <button onClick={() => dispatch(changePears(-1))}>-1</button>
      <button onClick={() => dispatch(changePears(1))}>+1</button>
    </div>
    <div>Здоровье: {state.health}
      <button onClick={() => dispatch(changeHealth(-1))}>-1</button>
      <button onClick={() => dispatch(changeHealth(1))}>+1</button>
    </div>
    <div>Сила: {state.power ? 'Yes' : 'No'}</div>
    <div>Золото: {state.gold}
      <button onClick={() => dispatch(changeGold(-1))}>-1</button>
      <button onClick={() => dispatch(changeGold(1))}>+1</button>
    </div>
    <div>Рогатка: {state.slingshot ? 'Yes' : 'No'}</div>
    <div>Лекарство: {state.medicine ? 'Yes' : 'No'}</div>
    <div>Сидр: {state.cider ? 'Yes' : 'No'}</div>
    <div>Вино: {state.wine}
      <button onClick={() => dispatch(changeWine(-1))} disabled={state.wine < 1}>Обменять вино на вкусняшку</button>
    </div>
    <div>Магия:

      water {state.magic[WATER]}
      <br />
      air {state.magic[AIR]}
      <br />
      fire {state.magic[FIRE]}
      <br />
      ground {state.magic[GROUND]}
      <br />
    </div>
    <div>
      {state.day >= 1 && <button onClick={handleEatPear} disabled={(state.health === 3 && state.power) || !state.pears}>Съесть грушу</button>}
    </div>
    <div>
      <button onClick={() => setShowPromocode(true)}>Промокод</button>
      { showPromocode && <Promocode onClose={handleClosePromocode} />}
    </div>
  </div>
}