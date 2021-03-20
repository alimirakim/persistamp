import React from 'react'


export function MonthDateYear(date) {
  const prettyDate = new Date(date).toLocaleString('en-EN', { year: 'numeric', month: 'long', day: 'numeric' })
  return <span>{prettyDate}</span>
}


export function MonthDateYearTime(date) {
  const prettyDate = new Date(date).toLocaleString('en-EN', { year: 'numeric', month: 'long', day: 'numeric', timeStyle: 'long' })
  return <span>{prettyDate}</span>
}