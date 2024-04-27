import React, { useState, useEffect, use } from 'react';
import { api_endpoint } from '../../api_endpoint';

const Terminal = ({ jobID }) => {
  const [outputs, setOutputs] = useState([
    '$ ls',
    'ExampleDirectory',
    'basic_Linux_commands.sh',
    'git_practice',
    'serverDocumentation.md',
    'simpleServer.js',
  ]);

  // Function to add new output lines
  // TODO: API integration
  const addOutput = (newOutput) => {
    setOutputs((prevOutputs) => [...prevOutputs, newOutput]);
  };

  //   useEffect(() => {
  //     var jobID = localStorage.getItem('jobID');
  //     setJobID(jobID);
  //   }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api_endpoint + jobID + '/status');
        const jsonData = await response.json();
        setOutputs(jsonData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000);

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
      style={{ height: '700px' }} // Set your fixed height here
    >
      {outputs.map((output, index) => (
        <div key={index}>{output}</div>
      ))}
    </div>
  );
};

export default Terminal;
