import React from 'react'
import './JobView.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faLocationPin,faBuilding } from '@fortawesome/free-solid-svg-icons'

function JobView({job,close}) {  
  return (
    <div className='jobview'>
      {/* <button onClick={close}>x</button> */}
      <FontAwesomeIcon className='close-btn' icon={faClose} onClick={close}/>
      <div className='jobview-header'>
        <h3>{job?.title}</h3>
        <p className='job-company'><FontAwesomeIcon icon={faBuilding}/> {job?.company_name} {job?.remote ? "( Remote )" : ""}</p>
        <p><FontAwesomeIcon icon={faLocationPin}/> {job?.location}</p>
        <a className='btn' href={job?.url}>Apply</a>
      </div>
      <p className='jobview-content' dangerouslySetInnerHTML={{__html : job?.description}}></p>
    </div>
  )
}

export default JobView