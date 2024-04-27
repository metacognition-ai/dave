'use client';
import React from 'react';
import { VscTerminal } from 'react-icons/vsc';
import { XTerm } from 'xterm-for-react';
import { FitAddon } from 'xterm-addon-fit';

const TerminalTypes = {
  Command: 'command',
  Output: 'output',
};

const Terminal = () => {
  const xtermRef = React.useRef(null);
  const lastCommandIndex = React.useRef(0);
  const fitAddon = React.useRef(FitAddon);
  const ref = React.useRef(null);

  const commands = [
    { content: 'ls', type: TerminalTypes.Command },
    { content: 'ls', type: TerminalTypes.Output },
    { content: 'ls', type: TerminalTypes.Output },
  ];

  React.useEffect(() => {
    /* Write commands to the terminal */
    xtermRef.current.terminal.write('$ ');
    if (xtermRef.current.terminal && commands.length > 0) {
      // Start writing commands from the last command index
      for (let i = lastCommandIndex.current; i < commands.length; i += 1) {
        const command = commands[i];
        const lines = command.content.split('\n');

        lines.forEach((line) => {
          xtermRef.current.terminal?.writeln(line);
        });

        if (command.type === 'output') {
          xtermRef.current.terminal.write('\n$ ');
        }
      }

      lastCommandIndex.current = commands.length; // Update the position of the last command
    }
  }, [commands]);

  //   React.useEffect(() => {
  //     /* Create a new terminal instance */
  //     fitAddon.current = new FitAddon();

  //     if (ref.current) {
  //       /* Initialize the terminal in the DOM */
  //       xtermRef.current.terminal.loadAddon(fitAddon.current);

  //       xtermRef.current.terminal.write('$ ');
  //     }
  //   }, []);

  return (
    <div className='flex flex-col h-full'>
      {/* <div className='border-b border-neutral-600 flex gap-2 items-center px-4 py-2 text-sm'>
        <VscTerminal /> Terminal (read-only)
      </div> */}
      <div className='p-2'>
        <XTerm
          ref={xtermRef}
          options={{ cursorBlink: true, fontSize: 14, fontFamily: 'monospace' }}
        />
      </div>
    </div>
  );
};

export default Terminal;
