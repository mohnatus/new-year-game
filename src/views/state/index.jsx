import { useEffect, useState } from "react"
import { STATES } from "../../constants/states"

export function State({ variant, duration, next }) {
  const [isNextVisible, setIsNextVisible] = useState(variant === STATES.toGo || variant === STATES.toSleep)

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        setIsNextVisible(true)
      }, duration)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [duration])

  return <div>
    {variant === STATES.toGo && 'Герой собирается в путь'}
    {variant === STATES.toSleep && 'Герой собирается спать'}
    {variant === STATES.go && 'Герой идет'}
    {variant === STATES.sleep && 'Герой спит'}
    {isNextVisible && <button onClick={next}>Next</button>}
  </div>
}