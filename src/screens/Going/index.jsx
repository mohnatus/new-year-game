import { useEffect } from "react";

export function Going({ onFinish }) {
  useEffect(() => {
    onFinish()
  }, [onFinish])

  return <div>going...</div>
}