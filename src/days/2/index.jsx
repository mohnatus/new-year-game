import { stories } from "../../data/stories"
import { useIterator } from "../../hooks/useIterator"
import { Going } from "../../screens/Going"
import { PearTree } from "../../screens/PearTree"
import { Story } from "../../screens/Story"
import { Rats } from "./stages/Rats"

const stages = [
  'country',
  'fight',
  'road1',
  'tree',
  'road2',
  'go'
]

export function Day2({ onFinish }) {
  const { element, next } = useIterator(stages)

  if (element === 'country') return <Story slides={stories.country2} onFinish={next} />
  if (element === 'fight') return <Rats onFinish={next} />
  if (element === 'road1') return <Story slides={stories.road21} onFinish={next} />
  if (element === 'tree') return <PearTree next={next} />
  if (element === 'road2') return <Story slides={stories.road22} onFinish={next} />

  return <Going onFinish={onFinish} />
}