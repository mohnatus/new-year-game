import { useCallback } from "react"
import { Story } from "../../../../screens/Story"
import { useAppDispatch } from "../../../../store"
import { changeWine } from "../../../../store/actions"
import { actions, stories } from "../../../../data/stories"

export function Country({ onFinish }) {
  const dispatch = useAppDispatch()

  const handleAction = useCallback((action, element) => {
    if (action === actions.wine) {
      dispatch(changeWine(element.wineCount))
    }
  }, [dispatch])

  return <div>
    <Story slides={stories.countryEvening} onFinish={onFinish} onAction={handleAction} />
  </div>
}