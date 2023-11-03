import { Story } from "../../../../screens/Story";

const slides = [
  { text: 'Привет, герой', },
  { text: 'Ледяные гномы напали на королевство Котогавия', },
  { text: 'Они украли казну и принцессу', },
  { text: 'Спаси нас, пожалуйста' },
]

export function Intro({ onFinish }) {
  return <Story slides={slides} onFinish={onFinish} />
}