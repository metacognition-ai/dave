'use client';
import React from 'react';
import { VscTerminal } from 'react-icons/vsc';
import { XTerm } from 'xterm-for-react';

const Terminal = () => {
  const xtermRef = React.useRef(null);

  React.useEffect(() => {
    // You can call any method in XTerm.js by using 'xterm xtermRef.current.terminal.[What you want to call]
    xtermRef.current.terminal.writeln(' >> Dave is live...');
  }, []);

  return (
    <div className='flex flex-col h-full'>
      {/* <div className='border-b border-neutral-600 flex gap-2 items-center px-4 py-2 text-sm'>
        <VscTerminal /> Terminal (read-only)
      </div> */}
      <div className='p-2'>
        <XTerm
          ref={xtermRef}
          options={{ lineHeight: 2 }}
        />
      </div>
    </div>
  );
};

export default Terminal;
