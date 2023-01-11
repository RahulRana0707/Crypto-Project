import React from 'react'
import { Link } from 'react-router-dom'

function DataTableTemplate(props) {
  return (
    <tr>
        <td className='remove-rank'>{props.rank}</td>
        <td className='logo-name'><Link to={`/crypto/${props.id}`}><img src={props.image} alt="Coin Logo"></img><span>{props.name}</span></Link></td>
        <td><span>{props.currencySymbol}</span>{props.price}</td>
        <td className='remove'><span>{props.currencySymbol}</span>{props.high}</td>
        <td className='remove'><span>{props.currencySymbol}</span>{props.low}</td>
        <td className='remove-market-cap'><span>{props.currencySymbol}</span>{props.marketCap}</td>
        <td className='remove-volume'><span>{props.currencySymbol}</span>{props.volume}</td>
    </tr>
  )
}

export default DataTableTemplate