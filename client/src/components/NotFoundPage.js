import React from 'react';
import Navbar from './Navbar';

const NotFoundPage = () => {
  return (
    <div className="Wrapper" style={{ width: '100vw', height: '100vh' }}>
      <Navbar />
      <div className="Content" style={{ display: 'flex', width: '80%', margin: '0 1.5rem' }}>
        <h2>404 Not Found</h2>
      </div>
    </div>
  );
}

export default NotFoundPage;
