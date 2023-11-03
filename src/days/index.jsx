import { useCallback } from "react";
import { finishDay, useAppDispatch } from "../store";
import { Day1 } from "./1";
import { Day2 } from "./2";

const days = [
  Day1, Day2
]

export function Day({ index }) {
  const dispatch = useAppDispatch()

  const DayComponent = days[index]

  const handleFinishDay = useCallback(() => {
    console.log('handle finish')
    dispatch(finishDay())
  }, [dispatch])

  return <DayComponent onFinish={handleFinishDay} />
}