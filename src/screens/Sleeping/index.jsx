import { useEffect } from "react";

export function Sleeping({ onFinish }) {
  useEffect(() => {
    onFinish()
  }, [onFinish])

  return <div>sleeping...</div>
}