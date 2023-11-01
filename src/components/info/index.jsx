import { addSlingshot, eatPear, resetState, useAppDispatch, useAppState } from "../../store";
import { changeDay, changeGold, changeHealth, changePears, resetDay } from "../../store/actions";

export function Info() {
  const state = useAppState()
  const dispatch = useAppDispatch()

  const handleEatPear = () => {
    dispatch(eatPear())
  }

  const handlePromocode = (e) => {
    e.preventDefault();

    const promocode = e.target.elements.promocode

    if (promocode.value.toLowerCase().trim() === 'sling') {
      dispatch(addSlingshot())
      promocode.value = ''
    }
  }

  return <div>
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
    <div>
      {state.day >= 1 && <button onClick={handleEatPear} disabled={(state.health === 3 && state.power) || !state.pears}>Съесть грушу</button>}
    </div>
    <div>
      промокод:
      <form onSubmit={handlePromocode}>
        <input type="text" name="promocode" />
      </form>
    </div>
  </div>
}