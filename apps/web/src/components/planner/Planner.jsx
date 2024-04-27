import React, { useState, useEffect } from 'react';

// TODO: API integration

const Planner = () => {
  //   useEffect(() => {
  //     const terminal = document.getElementById('mock-terminal');
  //     if (terminal) {
  //       terminal.scrollTop = terminal.scrollHeight;
  //     }
  //   }, [outputs]);

  return (
    <div
      id='mock-terminal'
      className='bg-white custom-height font-mono overflow-auto p-4 rounded-xl text-green-400 text-sm w-full'
      style={{ height: '700px' }} // Set your fixed height here
    >
      {/* {outputs.map((output, index) => (
        <div key={index}>{output}</div>
      ))} */}
    </div>
  );
};

export default Planner;
