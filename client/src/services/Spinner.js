import React from 'react';
import { Spinner, Intent } from '@blueprintjs/core';

const CustomSpinner = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw' }}>
      <Spinner intent={Intent.PRIMARY} size={100} />
    </div>
  )
}

export default CustomSpinner;