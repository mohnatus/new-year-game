import { useIterator } from "../../hooks/useIterator";
import { Country } from "./stages/Country";
import { Intro } from "./stages/Intro";
import { Tree } from "./stages/Tree";

const stages = [
  'intro',
  'tree',
  'country'
]

export function Day1({ onFinish }) {
  const { element, next } = useIterator(stages)

  if (element === 'intro') return <Intro onFinish={next} />
  if (element === 'tree') return <Tree onFinish={next} />
  return <Country onFinish={onFinish} />
}