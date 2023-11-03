import { stories } from "../../../../data/stories";
import { Story } from "../../../../screens/Story";

export function Intro({ onFinish }) {
  return <Story slides={stories.intro} onFinish={onFinish} />
}