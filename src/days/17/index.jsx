import { useIterator } from '../../hooks/useIterator'

const stages = [

]

export function Day17({ onFinish }) {
  const { element, next } = useIterator(stages);

  if (element === '') return <div></div>

  return <div>day 17</div>
}