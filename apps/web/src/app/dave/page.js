'use client';
import React, { useEffect } from 'react';
import { useState } from 'react';
import ChatInterface from '../../components/chat/Chat';
import LoadingSpinner from '../../components/chat/DaveLoading';

import { api_endpoint } from '../../api_endpoint';

import WorkspaceComponent from '../../components/workspace-components/WorkspaceComponents';

const Dave = () => {
  // const [isInitialized, setIsInitialized] = React.useState(true);
  const [jobID, setJobID] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchAgentStatus = async () => {
      try {
        const response = await fetch(api_endpoint + '/' + jobID + '/status');
        var jsonData = await response.json();

        const status = jsonData.status;
        setStatus(status);
      } catch (error) {
        // console.error('Failed to fetch data:', error);
      }
    };

    fetchAgentStatus();
    const intervalId = setInterval(fetchAgentStatus, 1000);

    return () => clearInterval(intervalId);
  }, [jobID]);

  // TODO: gaurdrails

  return (
    <div className='bg-gray-900 flex flex-col min-h-screen text-white'>
      {/* <header className='bg-gray-800 py-4'>
        <div className='container mx-auto px-4'>
          <h1 className='font-bold text-2xl'>Dave</h1>
        </div>
      </header> */}
      <main className='container flex flex-grow mx-auto px-4 py-8'>
        <div className='pr-4 w-1/2'>
          <ChatInterface
            jobID={jobID}
            setJobID={setJobID}
            status={status}
          />
          {/* {isInitialized ? <ChatInterface /> : <LoadingSpinner />} */}
        </div>
        <div className='pl-4 w-1/2'>
          <WorkspaceComponent jobID={jobID} />
        </div>
      </main>
      {/* <footer className='bg-gray-800 py-4'>
        <div className='container mx-auto px-4 text-center'>
          <p className='text-sm'>MetaCognition AI</p>
        </div>
      </footer> */}
    </div>
  );
};

export default Dave;
