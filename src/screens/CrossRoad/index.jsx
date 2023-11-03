import { useState } from "react"
import { useAppDispatch } from "../../store"

export function CrossRoad({ magic, next }) {
  const dispatch = useAppDispatch()
  const [currentView, setCurrentView] = useState(0)

  const views = ['magic', 'pears', 'gold']

  return <div>
    {!currentView && <> <button onClick={() => setCurrentView(1)}>Налево</button>
      <button onClick={() => setCurrentView(2)}>Прямо</button>
      <button onClick={() => setCurrentView(3)}>Направо</button></>}


    {currentView === 'magic' && <div>
      <button>Получить заклинания {magic}</button>
    </div>}

    {currentView === 'pears' && <div>
      <button>Получить груши </button>
    </div>}

    {currentView === 'gold' && <div>
      <button>Получить золото </button>
    </div>}
  </div>
}