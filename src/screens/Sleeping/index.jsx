import { useEffect } from "react";

import s from './style.module.css'

export function Sleeping({ onFinish }) {
  useEffect(() => {
    onFinish()
  }, [onFinish])

  return <div className={s.Sleeping}></div>
}