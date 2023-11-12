import s from './style.module.css'

export function Paper({ text, actions }) {
  return <div className={s.Text}>
    <div className={s.Bg} />
    <div className={s.Content}>
      <div>{text}</div>
      <div>{actions.map((action, i) => <button key={i} type="button" disabled={action.disabled} onClick={action.onClick}>{action.text}</button>)}</div>
    </div>
  </div>
}