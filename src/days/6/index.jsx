import { useIterator } from '../../hooks/useIterator'
import { Story } from "../../screens/Story"
import { stories } from '../../data/stories';
import { Choice } from './stages/Choice';
import { Sleeping } from '../../screens/Sleeping';

const stages = [
  'gopher',
  'choice',
  'sleep'
]

export function Day6({ onFinish }) {
  const { element, next } = useIterator(stages);

  if (element === 'gopher') return <Story slides={stories.gopher} onFinish={next} />
  if (element === 'choice') return <Choice onFinish={next} />


  return <Sleeping onFinish={onFinish} />
}