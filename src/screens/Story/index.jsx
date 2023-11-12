import { useCallback } from "react";
import { useIterator } from "../../hooks/useIterator";
import { Text } from "../Text";
import { useAppDispatch } from "../../store";

import s from './style.module.css'

export function Story({ slides, bg, nextText = 'Дальше', onFinish }) {
  const dispatch = useAppDispatch()

  const { element, next: nextIndex, isFinished } = useIterator(slides)

  const handleNext = useCallback(() => {
    if (element.action) {
      dispatch(element.action)
    }

    if (isFinished) onFinish()
    else nextIndex()

  }, [element, dispatch, isFinished, nextIndex, onFinish])


  return <div className={s.Story} data-bg={element.bg || bg}>
    <Text text={element.text} next={handleNext} nextText={element.nextText || nextText} />
  </div>
}