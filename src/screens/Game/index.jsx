import { useAppDispatch, useAppState, finishDay } from '../../store';

import { Day } from '../Day'
import { Info } from '../../components/Info'
import { FinishDay } from '../../screens/FinishDay'
import { useCallback, useEffect, useState } from 'react';
import { Health } from '../Health';

export function Game() {
  const state = useAppState();
  const dispatch = useAppDispatch();

  const [showHealthModal, setShowHealthModal] = useState(false)

  const isFinished = state.day === state.finishedDay;

  const handleFinishDay = () => {
    dispatch(finishDay())
  }

  const handleCloseHealthModal = useCallback(() => {
    console.log('close health')
    setShowHealthModal(false)
  }, [])

  useEffect(() => {
    console.log('health', state.health)
    if (state.health < 1) {
      setShowHealthModal(true)
    }
  }, [state.health])

  return <div>
    <Info />

    <Day index={state.day} onFinish={handleFinishDay} />

    {isFinished && <FinishDay />}

    {showHealthModal && <Health onClose={handleCloseHealthModal} />}
  </div>
}