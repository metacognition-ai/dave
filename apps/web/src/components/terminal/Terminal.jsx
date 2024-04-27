import React, { useState, useEffect, use } from 'react';

const MockTerminal = () => {
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

  useEffect(() => {
    // setTimeout(() => {
    //   const responseMessage = {
    //     id: Date.now(),
    //     text: `Sounds good. I'm working on it.`,
    //     sender: 'dave',
    //   };
    //   setMessages((prevMessages) => [...prevMessages, responseMessage]);
    // }, 2500);
    // sendPrompt();
  }, [outputs]);

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

export default MockTerminal;
