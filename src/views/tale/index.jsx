import { TALES } from "../../constants/tales"
import { Animal } from "./variants/animal"
import { Country } from "./variants/country"
import { Insect } from "./variants/insect"
import { Kajit } from "./variants/kajit"
import { Oldman } from "./variants/oldman"
import { Power } from "./variants/power"
import { Rats } from "./variants/rats"
import { Start } from "./variants/start"

const Variants = {
  [TALES.start]: Start,
  [TALES.country]: Country,
  [TALES.rats]: Rats,
  [TALES.oldman]: Oldman,
  [TALES.insect]: Insect,
  [TALES.power]: Power,
  [TALES.kajit]: Kajit,
  [TALES.animal]: Animal,
}

export function Tale({ variant, next, ...params }) {
  const Component = Variants[variant]

  return <Component next={next} {...params} />
}