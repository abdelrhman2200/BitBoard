import React, { useContext } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import arrow_icon from '../../assets/arrow_icon.png'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'


const Navbar = () => {

  const {setCurrency} = useContext(CoinContext)

  const currencyHandler = (e)=>{
    switch (e.target.value)
    {
      case "usd":{
        setCurrency({name: "usd" , symbol:"$"});
        break;
      }
      case "eur":{
        setCurrency({name: "eur" , symbol:"€"});
        break;
      }
      case "aed":{
        setCurrency({name: "aed" , symbol:"د.إ"});
        break;
      }
      default : {
        setCurrency({name: "usd" , symbol:"$"});
        break;
      }
    }
  }

  return (
    <div className='navbar'>
        <img src={logo} alt="" className='logo'/>
        <ul>
            <li>Home</li>
            <li>Market</li>
            <li>New Listing</li>
            <li><Link to="/calculator">Calculator</Link></li>

        </ul>
        <div className="nav-right">
            <select onChange={currencyHandler}>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="aed">AED</option>
            </select>
            <button>Sing up <img src={arrow_icon} alt="" /></button>
        </div>


    </div>
  )
}

export default Navbar