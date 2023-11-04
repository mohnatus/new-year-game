import { useIterator } from '../../hooks/useIterator'

const stages = [

]

export function Day24({ onFinish }) {
  const { element, next } = useIterator(stages);

  if (element === '') return <div></div>

  return <div>day 24</div>
}