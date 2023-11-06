import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, changeGold, useAppState } from "../../store"
import { WIN, init, killEnemies, shot } from "../../activities/fight";

export function Fight({ magic, onFinish }) {
  const dispatch = useAppDispatch();
  const state = useAppState()

  const [started, setStarted] = useState(false)
  const [tries, setTries] = useState(0)
  const [inactive, setInactive] = useState(false)


  const magicCount = state.magic[magic]
  console.log({ magic, magicCount })

  const handleUseMagic = () => {
    killEnemies(3, magic)
  }

  const handleShot = () => {
    shot()
  }

  const start = () => {
    setInactive(false)
    setStarted(true)

    const handleFinish = (result) => {
      if (result === WIN) {
        dispatch(changeGold(tries > 0 ? 1 : 2))
        onFinish('win')
      } else {
        setTries(prev => prev + 1);
        setInactive(true)
      }
    }

    init(handleFinish)
  }

  return <div>
    <button onClick={() => onFinish('lose')}>Сбежать</button>

    <div>
      {started && !inactive ? <div>
        {magic && <button disabled={magicCount <= 0} onClick={handleUseMagic}>Использовать магию {magic}</button>}
        <button onClick={handleShot}>Стрелять</button>
      </div> : <div>
        {inactive ? <button onClick={start}>Попробовать еще раз</button> : <button onClick={start}>Начать сражение</button>}
      </div>}
    </div>


  </div>
}