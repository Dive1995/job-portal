import React, { useEffect, useState } from 'react'
import './Pagination.css'

function Pagination({setCurrentPageNum}) {
  const [currentPage, setCurrentPage] = useState(1);  

  useEffect(() => {
      setCurrentPageNum(currentPage);
  }, [currentPage])

  const goToNextPage = () => {
    setCurrentPage(prev => prev + 1)
  }

  const goToPrevPage = () => {
    setCurrentPage(prev => prev - 1);
  }

  return (
    <div>
        <button onClick={goToPrevPage}>Prev</button>
        <button onClick={goToNextPage}>Next</button>
    </div>
  )
}

export default Pagination