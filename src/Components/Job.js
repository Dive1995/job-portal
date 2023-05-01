import React from 'react'
import moment from 'moment'
import './Job.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationPin, faBuilding } from '@fortawesome/free-solid-svg-icons'

function Job({company, title, remote, location, tags, posted, types, url, selectJob}) {
  return (
    <div onClick={selectJob} className='job' key={posted*1000}>
        <p className='job-title'>{title}</p>
        <ul className='type'>
            {types?.map(type => {
                return <li>{type}</li>     
            })}
        </ul>
        <p className='job-company'><FontAwesomeIcon icon={faBuilding}/> {company} {remote ? "( Remote )" : ""}</p>
        <p className='job-location'><FontAwesomeIcon icon={faLocationPin}/> {location}</p>
        <ul className='tags'>
            {tags?.map(tag => {
                return <li>{tag}</li>     
            })}
        </ul>
        <p className='job-posted'>{moment(posted*1000).fromNow()}</p>
    </div>
  )
}

export default Job