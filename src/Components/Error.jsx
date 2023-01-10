import React from 'react'
import { Link } from 'react-router-dom'
import "../Styles/Error.scss"
function Error(props) {
  return (
    <div className='error-page'>
        <div className='img-container'>
            <img src={props.image}></img>
        </div>
        <div className='text-container'>
            <h1 className='big-text'>oops!</h1>
            <h2 className='error-code'>{props.error_code}</h2>
            <p>the {props.error_name} you are looking for have been removed or is temporarily unavailable</p>
            <Link to={"/"}>go to homepage</Link>
        </div>
    </div>
  )
}

export default Error