import React, { useState, useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { VscTerminal } from 'react-icons/vsc';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    // Send a default message from the bot when the component mounts
    const defaultMessage = {
      id: Date.now(),
      text: 'Dave is waking up...',
      sender: 'dave',
    };
    setMessages([defaultMessage]);
  }, []);

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      const newMessage = {
        id: Date.now(),
        text: inputMessage,
        sender: 'user',
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputMessage('');
      // Simulate a response after 1 second
      setTimeout(() => {
        const responseMessage = {
          id: Date.now(),
          text: `Response to: ${newMessage.text}`,
          sender: 'dave',
        };
        setMessages((prevMessages) => [...prevMessages, responseMessage]);
      }, 1000);
    }
  };

  return (
    <div className='bg-gray-900 flex flex-col h-full'>
      <div className='border-b border-neutral-600 flex gap-2 items-center px-4 py-2 text-sm'>
        <VscTerminal />
        Chat
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
              } rounded-lg p-2 shadow`}>
              <p className='text-sm text-white'>{message.text}</p>
            </div>
          </div>
        ))}
      </ScrollToBottom>
      <div className='flex items-center px-4 py-2'>
        <input
          type='text'
          value={inputMessage}
          onChange={handleInputChange}
          placeholder='Chat with Dave...'
          className='bg-gray-800 border border-gray-700 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-600 mr-2 px-4 py-2 rounded-lg text-white'
        />
        <button
          onClick={handleSendMessage}
          className='bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 font-bold hover:bg-blue-700 px-4 py-2 rounded-lg text-white'>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
