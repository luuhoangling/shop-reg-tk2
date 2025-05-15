import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p className="copyright">
          &copy; {new Date().getFullYear()} Shop Registration App. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
