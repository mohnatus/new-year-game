import { useIterator } from '../../hooks/useIterator'
import { Sleeping } from '../../screens/Sleeping';
import { PearTree } from "../../screens/PearTree"
import { Story } from "../../screens/Story"
import { stories } from '../../data/stories';
import { Dwarfs } from './stages/dwarfs';

const stages = [
  'dwarfs',
  'fight',
  'road5',
  'pear',
  'evening5',
  'sleep'
]

export function Day5({ onFinish }) {
  const { element, next } = useIterator(stages);

  if (element === 'dwarfs') return <Story slides={stories.forestDwarfs} onFinish={next} />
  if (element === 'fight') return <Dwarfs onFinish={next} />
  if (element === 'road5') return <Story slides={stories.road5} onFinish={next} />
  if (element === 'pear') return <PearTree onFinish={next} />
  if (element === 'evening5') return <Story slides={stories.evening5} onFinish={next} />

  return <Sleeping onFinish={onFinish} />
}