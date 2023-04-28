import React from 'react'
import './Nav.css'

function Nav({isLoading}) {
  return (
    <nav>
        <h1>Job Portal</h1>
        {isLoading && <p>Loading...</p>}
      </nav>
  )
}

export default Nav