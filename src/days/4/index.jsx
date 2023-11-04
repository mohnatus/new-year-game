import { useIterator } from '../../hooks/useIterator'
import { Going } from '../../screens/Going';
import { PearTree } from "../../screens/PearTree"
import { Story } from "../../screens/Story"
import { stories } from '../../data/stories';
import { Obstacle } from '../../screens/Obstacle';

const stages = [
  'morning',
  'tree',
  'forest',
  'obstacle',
  'evening',
  'go'
]

export function Day4({ onFinish }) {
  const { element, next } = useIterator(stages);

  if (element === 'morning') return <Story slides={stories.morning4} onFinish={next} />
  if (element === 'tree') return <PearTree onFinish={next} />
  if (element === 'forest') return <Story slides={stories.forest} onFinish={next} />
  if (element === 'obstacle') return <Obstacle onFinish={next} />
  if (element === 'evening') return <Story slides={stories.evening4} onFinish={next} />

  return <Going onFinish={onFinish} />
}