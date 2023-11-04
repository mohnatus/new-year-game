import { useState } from "react"
import { promocodes } from "../../data/promocodes"
import { useAppDispatch, useAppState } from "../../store"
import { addPromocode } from "../../store/actions"

export function Promocode({ onClose }) {
  const dispatch = useAppDispatch()
  const { promocodes } = useAppState()

  const [code, setCode] = useState('')
  const [item, setItem] = useState(null)
  const [error, setError] = useState(false)
  const [isUsed, setIsUsed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const normalizedCode = code.trim().toLowerCase()
    const result = promocodes[normalizedCode]

    if (!result) {
      setError(true)
    } else {

      if (promocodes.includes(normalizedCode)) {
        setIsUsed(true);
        return;
      }

      dispatch(addPromocode(normalizedCode));
      dispatch(result.action)
      setItem(result)
    }
  }

  const handleRetry = () => {
    setItem(null)
    setError(false)
    setIsUsed(false)
    setCode('')
  }

  if (error) {
    return <div>
      Такого промокода не существует.
      <button onClick={handleRetry}>Попробовать еще раз</button>
      <button onClick={onClose}>Закрыть</button>
    </div>
  }

  if (isUsed) {
    return <div>
      Вы уже использовали этот код!
      <button onClick={handleRetry}>Попробовать еще раз</button>
      <button onClick={onClose}>Закрыть</button>
    </div>
  }

  if (item) {
    return <div>
      <h2>{item.title}</h2>
      <div>{item.description}</div>
      <button onClick={onClose}>Закрыть</button>
    </div>
  }


  return <div>
    <form onSubmit={handleSubmit}>
      <input type="text" value={code} onChange={e => setCode(e.target.value)} />
      <button type="submit">Применить</button>
    </form>
    <button onClick={onClose}>Закрыть</button>
  </div>
}