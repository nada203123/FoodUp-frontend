import "./Navbar.css";
import React, {useState} from "react";
import { NavLink } from 'react-router-dom'
import { IoLogOutOutline } from "react-icons/io5";
import { IoIosInformationCircle } from "react-icons/io";




function Navigationbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handelLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
   }
  
   
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          FOOD UP
        </div>
        <div className="nav-elements">
          <ul>
            <li>
              <NavLink to="/" className="nav-link">Menu</NavLink>
            </li>
            {!localStorage.getItem('token') && (
            <li>
              <NavLink to="/SignUp" className="nav-link">Sign Up</NavLink>
            </li>
            )}
            {!localStorage.getItem('token') && (
            <li>
              <NavLink to="/SignIn" className="nav-link">Sign In</NavLink>
            </li>
            )}
            {localStorage.getItem('token') && (
              <>
              <li>
              <NavLink to="/addCategory" className="nav-link">Add Category</NavLink>
            </li>
              <li>
              <NavLink to="/addProduct" className="nav-link">Add Product</NavLink>
            </li>
            <li onClick={handelLogout}>
                  <NavLink to="/SignIn" className="nav-link" > Logout </NavLink>
                </li>
            </>

            )}
            
          </ul>
        </div>
      </div>
    </nav>
 );
}

export default Navigationbar;