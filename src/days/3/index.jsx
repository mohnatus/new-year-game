import { stories } from "../../data/stories"
import { useIterator } from "../../hooks/useIterator"
import { Going } from "../../screens/Going"
import { PearTree } from "../../screens/PearTree"
import { Story } from "../../screens/Story"
import { Medicine } from "./stages/Medicine"
import { Oldman } from "./stages/Oldman"

const stages = [
  'morning',
  'tree',
  'oldman',
  'insect',
  'medicine',
  'evening',
  'going'
]

export function Day3({ onFinish }) {
  const { element, next } = useIterator(stages)

  if (element === 'morning') return <Story slides={stories.morning3} onFinish={next} />
  if (element === 'tree') return <PearTree onFinish={next} />
  if (element === 'oldman') return <Oldman onFinish={next} />
  if (element === 'insect') return <Story slides={stories.insect} onFinish={next} />
  if (element === 'medicine') return <Medicine onFinish={next} />
  if (element === 'evening') return <Story slides={stories.evening3} onFinish={next} />

  return <Going onFinish={onFinish} />
}