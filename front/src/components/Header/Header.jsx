import { useDispatch, useSelector, useStore } from "react-redux";
import {  Link, useHistory} from "react-router-dom";
import style from './header.module.css'
import {fetchLogoutUser} from "../../redux/reducer/authReducer"
import {clearCart} from "../../redux/reducer/cartReducer"
import { useEffect, useState } from "react";

const Header =()=>{
  const dispatch=useDispatch();
  const history=useHistory()
  const user = useSelector((state) => state.user);
  const cart=useSelector(state=>state.cart)
  const [userCart, setCart]=useState([])


  useEffect(()=>{
    setCart(cart.cart)
  }, [cart])



 const logout=()=>{
   dispatch(fetchLogoutUser())
   dispatch(clearCart())
   }
   
  
  return(
<nav className="navbar navbar-expand-lg navbar-light">
<div className="container-fluid">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={style["nav-link"]} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={style["nav-link"]} to="/calculator">Converter</Link>
            </li>
            <li className="nav-item">
              <Link className={style["nav-link"]} to="/coinslist">List</Link>
            </li>
            {!user.isAuthorised ? 
             ( <>
            <li className="nav-item" style={{marginLeft:750}}>
              <Link className={style["nav-link"]} to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className={style["nav-link"]} to="/register" >Register</Link>
            </li>
            
            </>): 
              (<>
              <li className="nav-item" style={{marginLeft:650}}>
              <Link className={style["nav-link"]} to="/profile">Profile</Link>
            </li>
              <li className="nav-item">
              <Link className={style["nav-link"]} to="/statistic">Statistic</Link>
            </li>
              <li className="nav-item">
              <Link className={style["nav-link"]} to="/logout" onClick={logout}>Logout</Link>
            </li>
              </>)}
          </ul>
          <div className="d-flex mt-2">
           
        
      <Link className={`${style["nav-link"]}  "m-2"`} to={`/cart/${user.user.username}`} >
     {userCart.length?
      <i style={{marginTop:10, marginRight:15, color:"green"}} className="fas fa-shopping-cart fa-lg shopcart">
         <span className={style.shopNum}>{userCart.length}</span></i>:<i style={{marginTop:10, marginRight:15, color:"white"}} className="fas fa-shopping-cart fa-lg shopcart"></i>
      
        }
        
       
            
          </Link>
          {/* <form className="d-flex mr-4"> */}
        {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
        {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
      {/* </form> */}
      </div>
          </div>
        </nav>
  )
}

export default Header;
