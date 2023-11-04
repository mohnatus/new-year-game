import { useIterator } from '../../hooks/useIterator'

const stages = [

]

export function Day5({ onFinish }) {
  const { element, next } = useIterator(stages);

  if (element === '') return <div></div>

  return <div>day 5</div>
}