import { eatPear, useAppDispatch } from "../../store"

export function NoHealth() {
  const dispatch = useAppDispatch()

  const handleEatPear = () => {
    dispatch(eatPear())
  }

  return <div>
    Ваше здоровье на нуле, вы скоро умрете.
    <button onClick={handleEatPear}>Съесть грушу</button>
  </div>
}