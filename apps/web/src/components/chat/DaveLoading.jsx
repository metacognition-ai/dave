import React from 'react';
import { BeatLoader } from 'react-spinners';

const LoadingSpinner = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100%',
      }}>
      <div className='text-center'>
        <BeatLoader color='#FFFFFF' />
        <p className='font-mono mt-2 text-sm text-white'>
          Initializing agent (may take up to 10 secs)...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
