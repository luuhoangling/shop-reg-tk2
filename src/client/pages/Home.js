import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      <div className="hero">
        <h2>Welcome to Shop Registration App</h2>
        <p>Manage your items with MongoDB Atlas and Express.js</p>
        <div className="cta-buttons">
          <Link to="/items" className="btn btn-primary">View Items</Link>
          <Link to="/items/add" className="btn btn-secondary">Add New Item</Link>
        </div>
      </div>
      
      <div className="features">
        <div className="feature">
          <h3>Server-Side Rendering</h3>
          <p>Built with React and Express.js for fast initial loading</p>
        </div>
        <div className="feature">
          <h3>MongoDB Atlas Integration</h3>
          <p>Reliable cloud database with detailed connection logging</p>
        </div>
        <div className="feature">
          <h3>Upload Functionality</h3>
          <p>Easy upload of item information and images</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
