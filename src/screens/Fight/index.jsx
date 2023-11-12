import { useEffect, useState } from "react";
import { useAppDispatch, changeGold, useAppState } from "../../store"
import { init, killEnemies, move, shot } from "../../activities/fight";
import { STATUS } from "../../constants/fight";
import { learnings } from "../../data/learnings";
import { Story } from "../Story";
import { addLearning } from "../../store/actions";
import { createPortal } from "react-dom";

import s from './style.module.css'

export function Fight({ magic, onFinish }) {
  const dispatch = useAppDispatch();
  const state = useAppState()

  const [started, setStarted] = useState(false)
  const [tries, setTries] = useState(0)
  const [inactive, setInactive] = useState(false)

  const magicCount = state.magic[magic]

  useEffect(() => {
    document.getElementById('canvas').style.display = 'block';

    return () => {
      document.getElementById('canvas').style.display = 'none';
    }
  })

  const handleUseMagic = () => {
    killEnemies(3, magic)
  }

  const handleUsePower = () => {
    killEnemies(5, 'power')
  }

  const handleShot = () => {
    shot()
  }

  const start = () => {
    setInactive(false)
    setStarted(true)

    const handleFinish = (result) => {
      if (result === STATUS.win) {
        dispatch(changeGold(tries > 0 ? 1 : 2))
        onFinish(STATUS.win)
      } else {
        setTries(prev => prev + 1);
        setInactive(true)
      }
    }

    init(handleFinish)
  }

  const hasSlingLearning = !state.learning.includes('fightSling') && state.slingshot;
  const hasGunLearning = !state.learning.includes('fightGun') && state.gun;
  const hasPowerLearning = !state.learning.includes('fightPower') && state.power;
  const hasMagicLearning = !state.learning.includes('fightMagic') && state.magic[magic] > 0;

  const hasLearning = hasSlingLearning || hasGunLearning || hasPowerLearning || hasMagicLearning

  return <div className={s.Fight}>


    {createPortal(<>
      {hasLearning && <div className={s.Learning}>
        {!hasSlingLearning && <Story bg="top" slides={learnings.fightSling} onFinish={() => dispatch(addLearning('fightSling'))} />}
      {hasGunLearning && <Story bg="top" slides={learnings.fightGun} onFinish={() => dispatch(addLearning('fightGun'))} />}
      {hasPowerLearning && <Story bg="top" slides={learnings.fightPower} onFinish={() => dispatch(addLearning('fightPower'))} />}
      {hasMagicLearning && <Story bg="top" slides={learnings.fightMagic} onFinish={() => dispatch(addLearning('fightMagic'))} />}

        </div>}

      {started && !inactive && <div className={s.Controls}>
        <div>
          <button onMouseDown={() => move(-1)} onMouseUp={() => move(0)}>LEFT</button>
          <button onClick={handleShot}>Стрелять</button>
          <button onMouseDown={() => move(1)} onMouseUp={() => move(0)}>RIGHT</button>
        </div>
        <button onClick={() => onFinish(STATUS.lose)}>Сбежать</button>
        {magic && <button disabled={magicCount <= 0} onClick={handleUseMagic}>Использовать магию {magic}</button>}
        {state.learning.includes('fightPower') && <button disabled={!state.power} onClick={handleUsePower}>Использовать силу</button>}

      </div>}

      {!started && <div className={s.Actions}>
        <button onClick={start}>Начать сражение</button>
        <button onClick={() => onFinish(STATUS.lose)}>Сбежать</button>
      </div>}

      {started && inactive && <div className={s.Actions}>
        <button onClick={start}>Попробовать еще раз</button>
      </div>}

    </>, document.getElementById('modals'))
    }

  </div >
}