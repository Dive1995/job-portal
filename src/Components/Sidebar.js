import React from 'react'

function Sidebar({searchString, searchJobs, tags,addOrRemoveItemToFilter}) {
  return (
    <div className='sidebar'>   
          <label>Search</label>
          <input type='text' value={searchString} onChange={(e) => searchJobs(e)}/>
          <label>Tags</label>
          <ul className='tag-list'>
            {tags.map(tag => {
              return <>
                <li style={{'color': tag.selected ? 'red' : ''}} onClick={() => addOrRemoveItemToFilter(tag)}>{tag.name}</li>
              </>
            })}
          </ul>          
        </div>
  )
}

export default Sidebar