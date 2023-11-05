import { useCallback, useEffect, useRef, useState } from "react";
import { finishDay, useAppDispatch } from "../store";

import { gameDays } from "../data/days";
import { useIterator } from "../hooks/useIterator";

import { Story } from "../screens/Story";
import { PearTree } from "../screens/PearTree";

import { Sleeping } from "../screens/Sleeping";
import { Going } from "../screens/Going";
import { Fight } from "../screens/Fight";
import { Choice } from "../screens/Choice";
import { Puzzle } from "../screens/Puzzle";



export function Day({ index }) {
  const dispatch = useAppDispatch()
  const day = gameDays[index]
  const dayData = useRef({})

  const [stageIndex, setStageIndex] = useState(0)

  useEffect(() => {
    setStageIndex(0)
    dayData.current = {}
  }, [index])

  const element = day.stages[stageIndex]

  const handleNextStage = (data) => {
    dayData.current[element.id] = data;

    setStageIndex(prev => {
      let i = prev + 1;
      while (day.stages[i]) {
        const el = day.stages[i];
        if (typeof el.checkDayData === 'function') {
          if (el.checkDayData(dayData.current)) {
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
  }

  // const DayComponent = days[index]

  const handleFinishDay = useCallback(() => {
    console.log('handle finish')
    dispatch(finishDay())
  }, [dispatch])

  if (element?.type === 'story') return <Story slides={element.slides} onFinish={handleNextStage} />
  if (element?.type === 'tree') return <PearTree onFinish={handleNextStage} />
  if (element?.type === 'fight') return <Fight magic={element.magic} onFinish={handleNextStage} />
  if (element?.type === 'choice') return <Choice text={element.text} options={element.options} onFinish={handleNextStage} />
  if (element?.type === 'puzzle') return <Puzzle magic={element.magic} onFinish={handleNextStage} />

  if (day.ending === 'sleeping') return <Sleeping onFinish={handleFinishDay} />
  return <Going onFinish={handleFinishDay} />
}