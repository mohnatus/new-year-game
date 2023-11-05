import { useCallback } from "react";
import { useIterator } from "../../hooks/useIterator";
import { Text } from "../Text";
import { useAppDispatch } from "../../store";


export function Story({ slides, nextText = 'Дальше', onFinish }) {
  const dispatch = useAppDispatch()

  console.log({ slides })

  const { element, next: nextIndex, isFinished } = useIterator(slides)

  const handleNext = useCallback(() => {
    if (element.action) {
      dispatch(element.action)
    }

    if (isFinished) onFinish()
    else nextIndex()

  }, [element, dispatch, isFinished, nextIndex, onFinish])


  return <div>
    <Text text={element.text} bg={element.bg} next={handleNext} nextText={element.nextText || nextText} />
  </div>
}