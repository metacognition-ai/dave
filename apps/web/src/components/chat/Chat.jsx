import React, { useState, useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { VscSparkleFilled, VscCircleFilled } from 'react-icons/vsc';
import { FaRobot, FaUser } from 'react-icons/fa';
import { Pill } from '@thumbtack/thumbprint-react';

import { Guard, Validators, exit } from '@guardrails-ai/core';

import { api_endpoint } from '../../api_endpoint';

const ChatInterface = ({ jobID, setJobID, status }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [userMessageCount, setUserMessageCount] = useState(0);
  const [promptsToSend, setPromptsToSend] = useState({
    prompt: '',
    repo_link: '',
  });

  const sendPrompt = () => {
    fetch(api_endpoint + '/process', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        task_name: 'Task',
        ...promptsToSend,
      }),
    }).then((res) =>
      res.ok
        ? res.json().then((data) => setJobID(data.job_id))
        : console.error(res)
    );
  };

  useEffect(() => {
    if (jobID !== '') {
      localStorage.setItem('jobID', jobID);
    }
  }, [jobID]);

  useEffect(() => {
    const defaultMessage = {
      id: Date.now(),
      text: `Hello, I'm Dave, an AI software engineer. How can I help you today?`,
      sender: 'dave',
    };
    setMessages([defaultMessage]);
  }, []);

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== '') {
      const newMessage = {
        id: Date.now(),
        text: inputMessage,
        sender: 'user',
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputMessage('');
      setUserMessageCount((prevCount) => prevCount + 1);

      if (userMessageCount === 0) {
        await setPromptsToSend((prevPrompts) => ({
          ...prevPrompts,
          prompt: inputMessage,
        }));
      } else if (userMessageCount === 1) {
        await setPromptsToSend((prevPrompts) => ({
          ...prevPrompts,
          repo_link: inputMessage,
        }));
      }
    }
  };

  const checkPrompt = (prompt) => {
    fetch(api_endpoint + '/guardrail', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
      }),
    }).then((res) =>
      res.ok
        ? res.json().then((data) => assert(data.gaurd_val))
        : console.error(res)
    );
  };

  useEffect(() => {
    if (userMessageCount === 2) {
      setTimeout(() => {
        const responseMessage = {
          id: Date.now(),
          text: `Sounds good. I'm working on it.`,
          sender: 'dave',
        };
        setMessages((prevMessages) => [...prevMessages, responseMessage]);
      }, 1500);

      sendPrompt();
    }
  }, [userMessageCount]);

  return (
    <div className='bg-gray-900 flex flex-col h-full'>
      <div className='border-b border-neutral-600 flex gap-2 items-center px-4 py-2 text-md'>
        <VscSparkleFilled />
        Chat
        {status === 'RUNNING' && (
          <Pill
            color='yellow'
            icon={<VscCircleFilled />}>
            Working
          </Pill>
        )}
        {status === 'COMPLETE' && (
          <Pill
            color='green'
            icon={<VscCircleFilled />}>
            Completed
          </Pill>
        )}
        {status !== 'RUNNING' && status !== 'COMPLETE' && (
          <Pill
            color='blue'
            icon={<VscCircleFilled />}>
            Ready
          </Pill>
        )}
      </div>
      <ScrollToBottom className='flex-grow overflow-y-auto p-4'>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            } mb-2`}>
            <div
              className={`${
                message.sender === 'user' ? 'bg-blue-600' : 'bg-gray-800'
              } rounded-lg p-2 shadow flex items-center gap-2`}>
              {message.sender === 'user' ? (
                <React.Fragment>
                  <p className='text-sm text-white'>{message.text}</p>
                  <FaUser
                    className='text-lg text-white'
                    size={20}
                  />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <FaRobot
                    className='text-lg text-white'
                    size={20}
                  />
                  <p className='text-sm text-white'>{message.text}</p>
                </React.Fragment>
              )}
            </div>
          </div>
        ))}
      </ScrollToBottom>
      <div className='flex items-center px-4 py-2'>
        <input
          // disabled={userMessageCount > 1}
          type='text'
          value={inputMessage}
          onChange={handleInputChange}
          placeholder='Send a message'
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
          className='bg-gray-800 border border-gray-700 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-600 mr-2 px-4 py-2 rounded-lg text-white'
        />
        <button
          // disabled={userMessageCount > 1}
          onClick={handleSendMessage}
          className={`bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 hover:bg-blue-700 focus:ring-blue-600 font-bold px-4 py-2 rounded-lg text-white`}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
