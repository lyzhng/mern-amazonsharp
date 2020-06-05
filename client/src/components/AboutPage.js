import React from 'react';

import Navbar from './Navbar';

export default () => {
  return (
    <div className="Wrapper" style={{ width: '100vw', height: '100vh' }}>
      <Navbar />
      <div className="Content" style={{ display: 'flex', width: '80%', margin: '0 1.5rem' }}>
        <h2>About</h2>
        <p>
          Amazon# was first created with Flask and SQLite3, about a year ago.
          Because I am learning React, I am recreating it using the MERN stack.
        </p>
      </div>
    </div>
  );
}
