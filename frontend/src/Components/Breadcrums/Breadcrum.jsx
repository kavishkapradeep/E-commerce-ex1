import React from 'react'
import '../Breadcrums/Breadcrum.css'
import arrow_icon from '../Assets/Frontend_Assets/breadcrum_arrow.png'
//import Product from '../../Pages/Product';

const Breadcrum = (props) => {

    const {product} =props;

  return (

    <div className='breadcrum'>
        HOME <img src={arrow_icon} alt="" srcset="" />
        Shop <img src={arrow_icon} alt="" srcset="" />
        {product.category}<img src={arrow_icon} alt="" srcset="" />
        {product.name}

    </div>
  )
}

export default Breadcrum;