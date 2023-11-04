import { useState } from "react"
import { stories } from "../../../../data/stories"
import { useIterator } from "../../../../hooks/useIterator"
import { Story } from "../../../../screens/Story"
import { addMedicine, useAppDispatch, useAppState } from "../../../../store"

const stages = [
  'before',
  'choice',
  'after',
]

function Choices({ onAgree, onDeny }) {
  const { pears } = useAppState()
  const dispatch = useAppDispatch()

  const handleGetMedicine = () => {
    dispatch(addMedicine(-1))
    onAgree()
  }

  return <div>
    <button onClick={handleGetMedicine} disabled={pears < 1}>Отдать 1 грушу</button>
    <button onClick={onDeny}>Не отдавать грушу</button>
  </div>
}

export function Oldman({ onFinish }) {
  const { element, next } = useIterator(stages)

  const [agree, setAgree] = useState(false)

  const handleAgree = () => {
    setAgree(true)
    next()
  }

  console.log({ element })

  if (element === 'before') return <Story slides={stories.oldman} onFinish={next} />
  if (element === 'choice') return <Choices onAgree={handleAgree} onDeny={next} />

  return <Story slides={agree ? stories.oldmanAgree : stories.oldmanDeny} onFinish={onFinish} />
}