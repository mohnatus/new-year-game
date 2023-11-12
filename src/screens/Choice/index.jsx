import { useAppDispatch, useAppState } from "../../store"

import s from './style.module.css'

export function Choice({ bg, text, options, onFinish }) {
  const dispatch = useAppDispatch()
  const state = useAppState()

  const list = options.map(option => {
    let enabled = true;
    if (typeof option.checkState === 'function') {
      enabled = option.checkState(state);
    }

    if (option.hide && !enabled) return null;

    return {
      ...option,
      disabled: !enabled,
    }
  }).filter(Boolean)

  const handleClick = option => {
    if (option.action) dispatch(option.action)
    onFinish(option.id)
  }
  return <div className={[s.Choice, 'fullscreen', 'touchable'].join(' ')} data-bg={bg}>
    <div>{text}</div>
    <div>
      {list.map(option => <button key={option.id}
        disabled={option.disabled} onClick={() => handleClick(option)} >{option.text}</button>)}
    </div>
  </div>
}