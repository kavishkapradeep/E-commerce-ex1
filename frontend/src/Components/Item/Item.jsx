import React from 'react'
import '../Item/Item.css'

const Item = (props) => {
  return (
    <div className='item'>
        <img src={props.image} alt="" srcset="" />
        <p>{props.name}</p>
        <div className="item-prices">
            <div className="item-price-now">
                    ${props.new_price}
            </div>
            <div className="item-price-old">
                    ${props.old_price}
            </div>
        </div>
    </div>
  )
}

export default Item