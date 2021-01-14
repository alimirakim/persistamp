import React, { useState } from 'react'


// IMPORTANT Repeat values causes confusion to input!! Remove all repeats
export default function IconInput({ color, value, setValue, icons }) {
  const [open, setOpen] = useState(false)

  const toggleOpen = (e) => setOpen(!open)
  const handleChange = (e) => {
    setValue(e.target.value)
    toggleOpen()
  }

  if (!icons) return null

  return (<>

    <button
      onClick={toggleOpen}
      type="button"
      className={`ico ${open ? "is-focused" : ""}`}
      style={{ position: "relative" }}
    >
      <i className="fas fa-question lo-center"></i>
    </button>

    {open &&
      <section className={`pop rbc rbc-icon-con th-dark-con lo-scrollbox-sml`}>

        {Object.values(icons).map((icon, i) => (<section key={i}>
          {/* <h4 className="th-sleek">{category}</h4> */}
          <div>
            <label key={i} className="rbc-con">
              <span style={{ display: "none" }}>{icon.title}</span>

              <input
                type="radio"
                value={icon.id}
                checked={value === icon.id}
                name="radio-button-image"
                className="rbc-input"
                onChange={handleChange}
              />

              <span className="rbc-box rbc-image">
                <i
                  className={`fas fa-${icon.title} rbc-checkback lo-center`}
                  style={{ color: color, position: "absolute" }}
                >
                </i>
              </span>
            </label>
          </div>

        </section>))}
      </section>
    }
  </>)
}