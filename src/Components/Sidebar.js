import React from 'react'
import './Sidebar.css'

function Sidebar({searchString, searchJobs, tags,addOrRemoveItemToFilter}) {
  const capitalize = (text) => {
    var capitalizedText = "";
    if(text.length > 0){
      capitalizedText = text.charAt(0).toUpperCase() + text.slice(1);
    }

    return capitalizedText;
  }

  return (
    <div className='sidebar'>   
      <label>Search</label>
      <input className='sidebar-searchBox' type='text' value={searchString} onChange={(e) => searchJobs(e)}/>
      <label>Tags</label>
      <ul className='tag-list'>
        {tags.map(tag => {
          return <>
            <li style={{'color': tag.selected ? 'red' : ''}} onClick={() => addOrRemoveItemToFilter(tag)}>{capitalize(tag.name)}</li>
          </>
        })}
      </ul>          
    </div>
  )
}

export default Sidebar