import { useEffect } from "react";

import s from './style.module.css'

export function Going({ onFinish }) {
  useEffect(() => {
    onFinish()
  }, [onFinish])

  return <div className={s.Going}></div>
}