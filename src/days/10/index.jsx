import { useIterator } from '../../hooks/useIterator'
import { Going } from '../../screens/Going';
import { PearTree } from "../../screens/PearTree";
import { Story } from "../../screens/Story"
import { stories } from '../../data/stories';

const stages = [

]

export function Day10({ onFinish }) {
  const { element, next } = useIterator(stages);

  if (element === '') return <div></div>

  return <div>day 10</div>
}