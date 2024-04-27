'use client';
import React from 'react';
import { VscTerminal } from 'react-icons/vsc';
import { XTerm } from 'xterm-for-react';
import { FitAddon } from '@xterm/addon-fit';

const Terminal = () => {
  const xtermRef = React.useRef(null);
  const fitAddon = new FitAddon();
  fitAddon.fit();

  React.useEffect(() => {
    // You can call any method in XTerm.js by using 'xterm xtermRef.current.terminal.[What you want to call]
    xtermRef.current.terminal.writeln('> Dave is live...');
  }, []);

  return (
    <div className='flex flex-col h-full'>
      <div className='border-b border-neutral-600 flex gap-2 items-center px-4 py-2 text-sm'>
        <VscTerminal /> Terminal (read-only)
      </div>
      <div className='flex-grow p-2'>
        <XTerm
          ref={xtermRef}
          addons={[fitAddon]}
          className='h-full'
        />
      </div>
    </div>
  );
};

export default Terminal;
