import { useState } from "react"
import { usePuzzle } from "../../../../hooks/usePuzzle"
import { useAppDispatch } from "../../../../store"

export function Obstacle({ onFinish }) {
  const dispatch = useAppDispatch()
  const puzzle = usePuzzle()

  const [errors, setErrors] = useState([])
  const [success, setSuccess] = useState(false)

  const handleSelect = (variant) => {
    if (variant.correct) {
      setSuccess(true);
    } else {
      setErrors(prev => {
        return [
          ...prev, variant.id
        ]
      })
    }
  }

  const getPrize = () => {
    onFinish();
  }

  return <div>
    <div>{puzzle.text}</div>
    <div>
      {puzzle.variants.map(variant => (<button key={variant.id}
        disabled={errors.includes(variant.id)}
        onClick={() => handleSelect(variant)}>{variant.text}</button>))}
    </div>
    {success && <div>
      Правильный ответ!
      Вы сделали {errors.length} ошибок.
      <button onClick={getPrize}>Получить приз</button>
    </div>}
  </div>
}