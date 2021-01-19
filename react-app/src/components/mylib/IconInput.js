import React, { useState } from 'react'


// IMPORTANT Repeat values causes confusion to input!! Remove all repeats
export default function IconInput({ color, value, setValue, icons }) {
  const [open, setOpen] = useState(false)

  const types = {
    "Symbols": [],
    "Nature": [],
    "Time & Weather": [],
    "Food": [],
    "Tools": [],
    "Items": [],
    "Technology": [],
    "People": [],
    "Activities": [],
    "Health": [],
    "Moods": [],
    "Places": [],
    "Transport": [],
    "Communication": [],
    "Clothing": [],
    "Furniture": [],
    "Commerce": [],
  }
  console.log("types", types, "icons", icons)
  Object.values(icons).forEach(icon => types[icon.type].push(icon.id))
  
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
      <section className={`pop rbc-icon-con th-dark-con lo-scrollbox-sml`}>

        {Object.keys(types).map((type, i) => (
          <section key={i}>
            {/* <h4 className="th-sleek">{category}</h4> */}
              <h4 className="rbc-cat">{type}</h4>
            <div className="rbc">
              {types[type].map((iid, j) => (
                <label key={j} className="rbc-con">
                  <span style={{ display: "none" }}>{iid.title}</span>

                  <input
                    type="radio"
                    value={iid}
                    checked={value === iid}
                    name="radio-button-image"
                    className="rbc-input"
                    onChange={handleChange}
                  />

                  <span className="rbc-box rbc-image">
                    <i
                      className={`fas fa-${icons[iid].title} rbc-checkback lo-center`}
                      style={{ color: color, position: "absolute" }}
                    />
                  </span>
                </label>
              ))}
            </div>
          </section>
        ))}
      </section>
    }
  </>)
}