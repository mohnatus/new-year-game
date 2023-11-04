import { stories } from "../../data/stories";
import { useIterator } from "../../hooks/useIterator";
import { PearTree } from "../../screens/PearTree";
import { Sleeping } from "../../screens/Sleeping";
import { Story } from "../../screens/Story";

const stages = [
  'intro',
  'tree',
  'country',
  'sleep'
]

export function Day1({ onFinish }) {
  const { element, next } = useIterator(stages)

  if (element === 'intro') return <Story slides={stories.intro} onFinish={next} />
  if (element === 'tree') return <PearTree onFinish={next} />
  if (element === 'country') return <Story slides={stories.country1} onFinish={next} />

  return <Sleeping onFinish={onFinish} />
}