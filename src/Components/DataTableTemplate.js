import React from 'react'
import { Link } from 'react-router-dom'

function DataTableTemplate(props) {
  return (
    <tr>
        <td>{props.rank}</td>
        <td className='logo-name'><Link to={`/crypto/${props.id}`}><img src={props.image} alt="Coin Logo"></img><span>{props.name}</span></Link></td>
        <td><span>{props.currencySymbol}</span>{props.price}</td>
        <td><span>{props.currencySymbol}</span>{props.high}</td>
        <td><span>{props.currencySymbol}</span>{props.low}</td>
        <td><span>{props.currencySymbol}</span>{props.marketCap}</td>
        <td><span>{props.currencySymbol}</span>{props.volume}</td>
    </tr>
  )
}

export default DataTableTemplate