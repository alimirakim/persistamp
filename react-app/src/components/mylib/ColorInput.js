import React, { useState } from 'react'

export default function ColorInput({ icon, value, setValue, colors }) {

  const handleChange = (e) => setValue(e.target.value)

  const chipColor = (color) => {
    if (color !== "#ffffff") return { backgroundColor: color }
    else return { backgroundColor: color, borderColor: "lightgray" }
  }

  const iconColor = (color) => {
    if (color !== "#ffffff") return { color: "white" }
    else return {}
  }

  return (
    <section className="rbc rbc-col" style={{flexDirection: "column"}}>
      {Object.values(colors).map((color, i) => (
        <label key={i} className="rbc-con">
          <span style={{ display: "none" }}>{color.title}</span>
          <input
            type="radio"
            value={color.id}
            checked={Number(value) === color.id}
            name="radio-button-color"
            className="rbc-input"
            onChange={handleChange}
          />
          <span className="rbc-box rbc-color" style={chipColor(color.hex)}>
            <i
              className={`fa fa-${icon} rbc-checkmark lo-center`}
              style={iconColor(color.hex)}
            >
            </i>
          </span>
        </label>))
      }
    </section>
  )
}