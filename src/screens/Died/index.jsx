import { changeHealth, useAppDispatch } from "../../store"

export function Died() {
  const dispatch = useAppDispatch()

  return <div>
    <div>Вы умерли :(</div>
     <button onClick={() => dispatch(changeHealth(1))}>+1</button>
    {/* Дать возможность за промокод продолжить */}
  </div>
}