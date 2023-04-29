import React from 'react'
import './Nav.css'
import Loading from '../Loading'

function Nav({isLoading}) {
  return (
    <nav>
        <h1>Job Portal</h1>
        {isLoading && <Loading/>}
      </nav>
  )
}

export default Nav