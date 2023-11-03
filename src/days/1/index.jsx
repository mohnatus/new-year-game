import { stories } from "../../data/stories";
import { useIterator } from "../../hooks/useIterator";
import { Sleeping } from "../../screens/Sleeping";
import { Story } from "../../screens/Story";
import { Tree } from "./stages/Tree";

const stages = [
  'intro',
  'tree',
  'country',
  'sleep'
]

export function Day1({ onFinish }) {
  const { element, next } = useIterator(stages)

  if (element === 'intro') return <Story slides={stories.intro} onFinish={next} />
  if (element === 'tree') return <Tree onFinish={next} />
  if (element === 'country') return <Story slides={stories.country1} onFinish={next} />

  return <Sleeping onFinish={onFinish} />
}