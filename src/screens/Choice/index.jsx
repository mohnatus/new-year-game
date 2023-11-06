import { useAppDispatch, useAppState } from "../../store"

export function Choice({ text, options, onFinish }) {
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
  return <div>
    <div>{text}</div>
    <div>
      {list.map(option => <button key={option.id}
        disabled={option.disabled} onClick={() => handleClick(option)} >{option.text}</button>)}
    </div>
  </div>
}