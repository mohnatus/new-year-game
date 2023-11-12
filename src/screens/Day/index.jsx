import { useCallback, useEffect, useRef, useState } from "react";
import { finishDay, useAppDispatch, useAppState } from "../../store";

import { CHOICE, FIGHT, PUZZLE, SLEEPING, STORY, TREE, gameDays } from "../../data/days";

import { Story } from "../Story";
import { PearTree } from "../PearTree";
import { Sleeping } from "../Sleeping";
import { Going } from "../Going";
import { Fight } from "../Fight";
import { Choice } from "../Choice";
import { Puzzle } from "../Puzzle";
import { setStageData } from "../../store/actions";

export function Day({ index }) {
  const dispatch = useAppDispatch()
  const state = useAppState()

  const day = gameDays[index]

  const [stageIndex, setStageIndex] = useState(0)
  const [next, setNext] = useState(false)

  useEffect(() => {
    setStageIndex(0)
  }, [index])

  const element = day.stages[stageIndex]

  useEffect(() => {
    if (!next) return;

    setStageIndex(prev => {
      let i = prev + 1;
      while (day.stages[i]) {
        const el = day.stages[i];
        if (typeof el.checkState === 'function') {
          if (el.checkState(state)) {
            break;
          } else {
            i++
          }
        } else {
          break;
        }
      }
      return i;
    })

    setNext(false)
  }, [next, day.stages, state])

  const handleNextStage = async (data) => {
    if (element.id) {
      await dispatch(setStageData(element.id, data))
    }

    setNext(true)
  }

  const handleFinishDay = useCallback(() => {
    dispatch(finishDay())
  }, [dispatch])

  if (element?.type === STORY) return <Story key={stageIndex} bg={element.bg} slides={element.slides} onFinish={handleNextStage} />
  if (element?.type === TREE) return <PearTree onFinish={handleNextStage} />
  if (element?.type === FIGHT) return <Fight magic={element.magic} onFinish={handleNextStage} />
  if (element?.type === CHOICE) return <Choice text={element.text} options={element.options} onFinish={handleNextStage} />
  if (element?.type === PUZZLE) return <Puzzle magic={element.magic} onFinish={handleNextStage} />

  if (day.ending === SLEEPING) return <Sleeping onFinish={handleFinishDay} />
  return <Going onFinish={handleFinishDay} />
}