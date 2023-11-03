export function Text({ text, bg, next, nextText = 'Дальше' }) {
  return <div>
    <div>{text}</div>

    <button onClick={next}>{nextText}</button>
  </div>
}