import { useIterator } from '../../hooks/useIterator'

const stages = [

]

export function Day11({ onFinish }) {
  const { element, next } = useIterator(stages);

  if (element === '') return <div></div>

  return <div>day 11</div>
}