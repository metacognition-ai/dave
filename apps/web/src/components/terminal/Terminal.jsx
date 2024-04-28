import React, { useState, useEffect, use } from 'react';
import { api_endpoint } from '../../api_endpoint';

const Terminal = ({ jobID }) => {
  const [outputs, setOutputs] = useState(['$ ']);

  //const jobID = '23132131';

  // Function to add new output lines
  //   const addOutput = (newOutput) => {
  //     setOutputs((prevOutputs) => [...prevOutputs, newOutput]);
  //   };

  //   useEffect(() => {
  //     var jobID = localStorage.getItem('jobID');
  //     setJobID(jobID);
  //   }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api_endpoint + '/' + jobID + '/logs');
        var jsonData = await response.json();

        var logs = jsonData.response;

        var setJsonData = logs.split('\n');

        setOutputs(setJsonData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    if (jobID !== '') fetchData();
    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, [jobID]);

  // Effect to make sure the terminal is scrolled to the bottom on new output
  useEffect(() => {
    const terminal = document.getElementById('mock-terminal');
    if (terminal) {
      terminal.scrollTop = terminal.scrollHeight;
    }
  }, [outputs]);

  return (
    <div
      id='mock-terminal'
      className='bg-black custom-height font-mono overflow-auto p-4 rounded-xl text-green-400 text-sm w-full'
      style={{ height: '700px' }}>
      {outputs.map((output, index) => (
        <div key={index}>{output}</div>
      ))}
    </div>
  );
};

export default Terminal;
