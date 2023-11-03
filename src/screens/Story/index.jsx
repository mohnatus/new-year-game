import { useCallback } from "react";
import { useIterator } from "../../hooks/useIterator";
import { Text } from "../Text";

export function Story({ slides, nextText = 'Дальше', onFinish, onAction }) {
  const { element, next: nextIndex, isFinished } = useIterator(slides)

  const handleNext = useCallback(() => {
    if (element.action && typeof onAction === 'function') {
      onAction(element.action, element)
    }

    if (isFinished) onFinish()
    else nextIndex()

  }, [element, isFinished, nextIndex, onAction, onFinish])


  return <div>
    <Text text={element.text} bg={element.bg} next={handleNext} nextText={element.nextText || nextText} />
  </div>
}