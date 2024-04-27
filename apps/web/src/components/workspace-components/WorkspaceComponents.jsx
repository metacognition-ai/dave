import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FaTerminal, FaCalendarAlt, FaCode, FaGlobe } from 'react-icons/fa';
import Terminal from '../terminal/Terminal';
import Planner from '../planner/Planner';
// import CodeEditor from './CodeEditor';
// import Browser from './Browser';

const WorkspaceComponent = ({ jobID }) => {
  return (
    <Tabs className='flex flex-col'>
      <TabList className='border-b border-neutral-600 flex'>
        <Tab
          className='border-b-2 border-transparent cursor-pointer flex focus:outline-none hover:border-gray-300 hover:text-gray-600 items-center px-4 py-2 space-x-2 text-md'
          selectedClassName='bg-white text-black rounded-lg'>
          <FaTerminal className='text-lg' />
          <span>Terminal</span>
        </Tab>
        <Tab
          className='border-b-2 border-transparent cursor-pointer flex focus:outline-none hover:border-gray-300 hover:text-gray-600 items-center px-4 py-2 space-x-2 text-md'
          selectedClassName='bg-white text-black rounded-lg'>
          <FaCalendarAlt className='text-lg' />
          <span>Planner</span>
        </Tab>
        {/* <Tab
          className="border-b-2 border-transparent cursor-pointer flex focus:outline-none hover:border-gray-300 hover:text-gray-600 items-center px-4 py-2 space-x-2"
          selectedClassName="bg-white"
        >
          <FaCode className="text-lg" />
          <span>Code Editor</span>
        </Tab>
        <Tab
          className="border-b-2 border-transparent cursor-pointer flex focus:outline-none hover:border-gray-300 hover:text-gray-600 items-center px-4 py-2 space-x-2"
          selectedClassName="bg-white"
        >
          <FaGlobe className="text-lg" />
          <span>Browser</span>
        </Tab> */}
      </TabList>
      <TabPanel>
        <div className='p-4'>
          <Terminal jobID={jobID} />
        </div>
      </TabPanel>
      <TabPanel>
        <div className='p-4'>
          <Planner jobID={jobID} />
        </div>
      </TabPanel>
      {/* <TabPanel>
        <div className="p-4">
          <CodeEditor />
        </div>
      </TabPanel>
      <TabPanel>
        <div className="p-4">
          <Browser />
        </div>
      </TabPanel> */}
    </Tabs>
  );
};

export default WorkspaceComponent;
