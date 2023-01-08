import React from 'react'

function CoinsCard(props) {
  return (
        <div className='card'>
        <div className='coin-image'>
            <img src={`${props.img}`} alt={"Coin Logo"}></img>
        </div>
        <div className='coin-name'>
            <h3>{props.name}</h3>
        </div>
        <div className='coin-rank'>
            <p>Rank {props.rank}</p>
        </div>
        <div className='coin-established'>
            <p>{props.country}<span>{props.year}</span></p>
        </div>
    </div>
  )
}

export default CoinsCard