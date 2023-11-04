import { useCallback } from "react";
import { finishDay, useAppDispatch } from "../store";
import { Day1 } from "./1";
import { Day2 } from "./2";
import { Day3 } from "./3";
import { Day4 } from "./4";
import { Day5 } from "./5";
import { Day6 } from "./6";
import { Day7 } from "./7";
import { Day8 } from "./8";
import { Day9 } from "./9";
import { Day10 } from "./10";
import { Day11 } from "./11";
import { Day12 } from "./12";
import { Day13 } from "./13";
import { Day14 } from "./14";
import { Day15 } from "./15";
import { Day16 } from "./16";
import { Day17 } from "./17";
import { Day18 } from "./18";
import { Day19 } from "./19";
import { Day20 } from "./20";
import { Day21 } from "./21";
import { Day22 } from "./22";
import { Day23 } from "./23";
import { Day24 } from "./24";
import { Day25 } from "./25";
import { Day26 } from "./26";
import { Day27 } from "./27";
import { Day28 } from "./28";
import { Day29 } from "./29";
import { Day30 } from "./30";
import { Day31 } from "./31";

const days = [
  Day1, Day2, Day3, Day4, Day5,
  Day6, Day7, Day8, Day9, Day10, Day11, Day12, Day13, Day14, Day15, Day16, Day17, Day18, Day19,
  Day20, Day21, Day22, Day23, Day24, Day25, Day26, Day27, Day28, Day29, Day30, Day31
]

export function Day({ index }) {
  const dispatch = useAppDispatch()

  const DayComponent = days[index]

  const handleFinishDay = useCallback(() => {
    console.log('handle finish')
    dispatch(finishDay())
  }, [dispatch])

  return <DayComponent onFinish={handleFinishDay} />
}