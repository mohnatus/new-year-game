import { Fight } from "../../../../screens/Fight";

export function Dwarfs({ onFinish }) {
  const handleFinish = (result) => {
    console.log({ result })
    onFinish()
  }

  return <div>
    <Fight onFinish={handleFinish} />
  </div>
}