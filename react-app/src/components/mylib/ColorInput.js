import React, { useState } from 'react'

export default function ColorInput({ icon, value, setValue, toggleIcons, colors }) {

  console.log("color icon", icon)
  if (!colors) colors = [
    "rgb(70,60,70)",
    "#f9fbefff",
    "#e05265ff",
    "#f78464ff",
    "#f0bc62ff",
    "#ffdf7eff",
    "#8cb15eff",
    "#1b9d8eff",
    "#5a70ccff",
    "#2e5a9cff",
    "#4f4686ff",
    "#964a70ff",
    "#885c58ff",
    "#5c2f2fff",
    "#2f2032ff",
    "#57768aff",
  ]

  const handleChange = (e) => setValue(e.target.value)

  const chipColor = (color) => {
    console.log("color", color)
    if (color !== "#f9fbef") return { backgroundColor: color }
    else return { backgroundColor: color, borderColor: "lightgray" }
  }

  const iconColor = (color) => {
    if (color !== "#f9fbef") return { color: "white" }
    else return {}
  }

  return (
    <section className="rbc">
      <button onClick={toggleIcons} type="button" className="ico-btn">
        <i className="fas fa-question lo-center"></i>
      </button>
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
              style={iconColor(color)}
            >
            </i>
          </span>
        </label>))
      }
    </section>
  )
}