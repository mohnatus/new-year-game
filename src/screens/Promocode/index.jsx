import { useState } from "react"
import { promocodes } from "../../data/promocodes"
import { useAppDispatch } from "../../store"

export function Promocode({ onClose }) {
  const dispatch = useAppDispatch()

  const [code, setCode] = useState('')
  const [item, setItem] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const normalizedCode = code.trim().toLowerCase()
    const result = promocodes[normalizedCode]

    if (!result) {
      setError(true)
    } else {
      dispatch(result.action)
      setItem(result)

    }
  }

  const handleRetry = () => {
    setItem(null)
    setError(null)
    setCode('')
  }

  if (error) {
    return <div>
      Такого промокода не существует.
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