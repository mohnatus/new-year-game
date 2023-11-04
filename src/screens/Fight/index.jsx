import { memo, useCallback, useEffect, useId, useState } from "react";
import { useAppDispatch, changeGold } from "../../store"
import { init } from "../../activities/fight";

const Field = memo(({ id, onFinish }) => {
  useEffect(() => {
    init(id, onFinish)
  }, [id, onFinish])

  return <canvas id={id} width="300" height="300" style={{ border: '1px solid' }}></canvas>
})

export function Fight({ onFinish }) {
  const dispatch = useAppDispatch();
  const id = useId()

  const [started, setStarted] = useState(false)
  const [tries, setTries] = useState(0)
  const [inactive, setInactive] = useState(false)

  const handleFinish = useCallback((result) => {
    if (result === 'win') {
      dispatch(changeGold(tries > 0 ? 1 : 2))
      onFinish('win')
    } else {
      setTries(prev => prev + 1);
      setInactive(true)
    }
  }, [dispatch, tries, onFinish])

  return <div>
    {started && !inactive ? <Field id={id} onFinish={handleFinish} /> : <div>
      {inactive ? <button onClick={() => setInactive(false)}>Попробовать еще раз</button> : <button onClick={() => setStarted(true)}>Начать сражение</button>}
    </div>}

    <button onClick={() => onFinish('lose')}>Сбежать</button>
  </div>
}