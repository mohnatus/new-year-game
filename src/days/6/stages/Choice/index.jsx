import { useState } from "react"
import { Story } from "../../../../screens/Story"
import { stories } from "../../../../data/stories"
import { useIterator } from "../../../../hooks/useIterator"
import { Fight } from "../../../../screens/Fight"

const burrowStages = [
  'before',
  'fight',
  'after'
]

function Burrow({ onFinish }) {
  const { element, next } = useIterator(burrowStages)

  if (element === 'before') return <Story slides={stories.gophersBurrow} onFinish={next} />
  if (element === 'fight') return <Fight onFinish={next} />

  return <Story slides={stories.evening6} onFinish={onFinish} />
}

export function Choice({ onFinish }) {
  const [result, setResult] = useState()
  return <div>
    {!result && <div>
      <button onClick={() => setResult('agree')}>Пойти за сусликом</button>
      <button onClick={() => setResult('deny')}>Не идти за сусликом</button>
    </div>}

    {result === 'deny' && <Story slides={stories.gophersDeny} onFinish={onFinish} />}

    {result === 'agree' && <Burrow onFinish={onFinish} />}
  </div>
}