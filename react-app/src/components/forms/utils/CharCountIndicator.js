import React, { useState, useEffect } from 'react'


export default function CharCountIndicator({ length, maxLength }) {
  const [isErr, setIsErr] = useState("")

  useEffect(() => {
    if (length > maxLength) setIsErr("is-err")
    else setIsErr("")
  }, [length])

  return (
    <small className={`char-counter ${isErr}`}>{length} / {maxLength} characters left</small>
  )
}