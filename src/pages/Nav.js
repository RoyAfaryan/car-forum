import React, { useState } from 'react';
import './styles/home.css';

const Nav = ({signOut, handlePageChange}) => {

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
            <a href="#" onClick={() => handlePageChange('home')}>Home</a>
            <a href="#">Account</a>
            <a href="#" onClick={() => handlePageChange('new_post')}>Create Post</a>
            <a href="#" onClick={signOut}>Logout</a>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Nav;
