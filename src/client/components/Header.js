import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">Shop Registration</h1>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/items" className="nav-link">Items</Link>
            </li>
            <li className="nav-item">
              <Link to="/items/add" className="nav-link">Add Item</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
