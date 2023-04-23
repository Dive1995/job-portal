import React from 'react'
import moment from 'moment'
import './Job.css'

function Job({company, title, remote, location, tags, posted, types, url}) {
  return (
    <div className='job' key={posted*1000}>
        <p className='job-title'>{title}</p>
        <ul className='tags'>
            {types?.map(type => {
                return <li>{type}</li>     
            })}
        </ul>
        <p className='job-company'>{company} {remote ? "( Remote )" : ""}</p>
        <p className='job-location'>{location}</p>
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