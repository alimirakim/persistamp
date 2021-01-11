import React from 'react'


export default function ErrorMessages({ errors }) {
  return (
    <div>
      {errors.map(error => {
        console.log(error)
        return <div className='material-error'>{error}</div>
      })}
    </div>
  )
}
