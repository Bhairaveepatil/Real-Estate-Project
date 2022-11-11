import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Error404.css"

export default function Error404() {
  return (
    <div id='error'>
      <div id='insideDiv'>
        <h1 id='errorHeading' >404 Page Not Found!</h1>
          <NavLink to='/'>
            <button id="error_Button">Go Back</button>
          </NavLink>
      </div>
    </div>
  )
}
