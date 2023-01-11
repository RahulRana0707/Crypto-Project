import React from 'react'

function Pagination(props) {
  return (
    <div className="pagination">
              <ul>
                <li className="page-item">
                  <button onClick={props.handlePrevious}>previous</button>
                </li>
                <li className="page-item">
                  <button onClick={()=>{props.setPage(1)}}>1</button>
                </li>
                <li className="page-item">
                  <button onClick={()=>{props.setPage(2)}}>2</button>
                </li>
                <li className="page-item">
                  <button onClick={()=>{props.setPage(3)}}>3</button>
                </li>
                <li className="page-item">
                  <button onClick={()=>{props.setPage(prev=>prev+1)}}>next</button>
                </li>
              </ul>
          </div>
  )
}

export default Pagination