import React from 'react'


export default function ErrorMessages({ errors }) {
  return (
    <div>
      {errors.map(error => <div key={error} className='err'>{error}</div>)}
    </div>
  )
}
