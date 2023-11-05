import { useId, useRef, useState } from "react"
import { usePuzzle } from "../../hooks/usePuzzle"
import { changePears, useAppDispatch } from "../../store"
import { changeGold, changeMagic, changeWine } from "../../store/actions"

const magics = ['fire', 'air', 'water', 'ground']

export function Puzzle({ magic, onFinish }) {
  const dispatch = useAppDispatch()
  const puzzle = usePuzzle()

  const magicIndex = useRef(Math.floor(Math.random() * magics.length))

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

  const getPears = () => {
    dispatch(changePears(2))
    onFinish('pears');
  }

  const getWine = () => {
    dispatch(changeWine(1))
    onFinish('wine');
  }

  const getGold = () => {
    dispatch(changeGold(1))
    onFinish('gold');
  }

  const getMagic = () => {
    dispatch(changeMagic(magic || magics[magicIndex.current], 1))
    onFinish('magic');
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
      Вы сделали {errors.length} ошибок. Выберите подарок:

      <button onClick={getMagic} disabled={errors.length > 0}>Магия {magic || magics[magicIndex.current]} +1</button>
      <button onClick={getGold} disabled={errors.length > 1}>Золото +1</button>
      <button onClick={getPears} disabled={errors.length > 2}>Груши +2</button>

      <button onClick={getWine}>Вино +1</button>
    </div>}
  </div>
}