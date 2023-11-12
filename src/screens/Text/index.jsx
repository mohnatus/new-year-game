import s from './style.module.css'

export function Text({ text, next, nextText = 'Дальше' }) {
  return <div className={s.Text}>
    <div className={s.Bg} />
    <div className={s.Content}>
      <div>{text}</div>
      <button className={s.Next} onClick={next}>{nextText}</button>
    </div>
  </div>
}