import React from 'react'
import './Nav.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

function Nav() {
  return (
    <nav>
        <h1>Job Portal</h1>        
        <FontAwesomeIcon className='open-sidebar' icon={faBars}/>
      </nav>
  )
}

export default Nav