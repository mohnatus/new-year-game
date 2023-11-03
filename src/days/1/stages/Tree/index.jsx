import { useCallback, useState } from "react";
import { PearTree } from "../../../../screens/PearTree";
import { Story } from "../../../../screens/Story";
import { stories } from "../../../../data/stories";

export function Tree({ onFinish }) {
  const [showLearning, setShowLearning] = useState(true)
  const handleFinishLearning = useCallback(() => {
    setShowLearning(false)
  }, [])

  return <div>
    <PearTree next={onFinish} />
    {showLearning && <Story slides={stories.treeLearning} onFinish={handleFinishLearning} />}
  </div>
}