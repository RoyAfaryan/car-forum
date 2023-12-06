import React, { useState } from 'react';
import './styles/home.css';
import {Link} from "react-router-dom";

const Nav = ({ signOut, handlePageChange }) => {

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const closeDropdownIfOutsideClicked = (event) => {
    if (!event.target.matches('.dropbtn')) {
      setIsDropdownVisible(false);
    }
  };

  // Attach the event listener when the component mounts
  React.useEffect(() => {
    window.addEventListener('click', closeDropdownIfOutsideClicked);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('click', closeDropdownIfOutsideClicked);
    };
  }, []);

  return (
      <div className="Nav">
        <header className="navbar">
          <div className="logo">Car Forum Project</div>
          <div className="search-bar">
            <input type="text" placeholder="Search" />
          </div>
          <div className="dropdown">
            <button onClick={toggleDropdown} className="dropbtn">
              ▼
            </button>
            <div
                id="myDropdown"
                className={`dropdown-content ${isDropdownVisible ? 'show' : ''}`}
            >
              <Link to="../">
                <p>Home</p>
              </Link>
              <a href="#">Account</a>
              <Link to="../create-post">
                <p>Create Post</p>
              </Link>
              <a href="#" onClick={signOut}>Logout</a>
            </div>
          </div>
        </header>
      </div>
  );
};

export default Nav;
