import { Paper } from '../../components/Paper'

export function Text({ text, next, nextText = 'Дальше' }) {

  return <Paper text={text} actions={[{ text: nextText, onClick: next }]} />
}