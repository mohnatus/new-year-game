import { useAppDispatch, useAppState, finishDay } from '../../store';

import { Day } from '../Day'
import { Info } from '../../components/Info'
import { FinishDay } from '../../screens/FinishDay'

export function Game() {
  const state = useAppState();
  const dispatch = useAppDispatch();

  const isFinished = state.day === state.finishedDay;

  const handleFinishDay = () => {
    dispatch(finishDay())
  }

  return <div>
    <Info />

    <Day index={state.day} onFinish={handleFinishDay} />

    {isFinished && <FinishDay />}

    {state.health < 1 && state.pears > 0 && <></>}
  </div>
}