import { memo, useEffect, useId } from "react";
import { useAppDispatch, changeGold } from "../../store"
import { init } from "../../activities/fight";

const Field = memo(({ id }) => {
  useEffect(() => {
    init(id)
  }, [id])

  return <canvas id={id} width="300" height="300" style={{ border: '1px solid' }}></canvas>
})

export function Fight({ next, variant }) {
  const dispatch = useAppDispatch();
  const id = useId()

  const handleFinish = (count) => {
    dispatch(changeGold(count))
    next()
  }

  return <div>
    Сражение с {variant}

    <Field id={id} />

    <button onClick={() => handleFinish(2)}>Победа с первого раза</button>
    <button onClick={() => handleFinish(1)}>Победа не с первого раза</button>
    <button onClick={next}>Сбежать</button>
  </div>
}