import React, { useState } from 'react'
import '../Navbar/Navbar.css'
import logo from '../Assets/Admin_Assets/nav-logo.png'
import cart_icon from "../Assets/Admin_Assets/Product_Cart.svg"
const Navbar = () => {

  const [menu,setMenu] =useState("shop");

  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo} alt=""  />
           
        </div>
            <ul className="nav-menu">
                <li onClick={()=>{setMenu("shop")}}>Shop {menu==="shop"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("mens")}}>Men {menu==="mens"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("womens")}}>Women{menu==="womens"?<hr/>:<></>} </li>
                <li onClick={()=>{setMenu("kids")}}>Kids {menu==="kids"?<hr/>:<></>}</li>
            </ul>
            <div className="nav-login-cart">
                <button >login</button>
                <img src={cart_icon} alt="" srcset="" />
                <div className="nav-cart-count">0</div>
            </div>
        
    </div>
  )
}

export default Navbar