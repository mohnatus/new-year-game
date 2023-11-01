import { useAppDispatch, changePears } from "../../../../store"

export function Power({ next }) {
  const dispatch = useAppDispatch()

  const handleTakeBasket = () => {
    dispatch(changePears(4))
  }

  return <div>

    <div>Корзинка с грушами, получение power
      <button onClick={handleTakeBasket}>Взять корзинку</button>
      <button onClick={next}>Next</button>
    </div>
  </div>
}