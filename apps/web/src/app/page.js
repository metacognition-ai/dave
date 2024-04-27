'use client';

import React, { useState } from 'react'; // Import useState
import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';
import Head from 'next/head';

import ReduxProvider from '../app/StoreProvider';
import store from '../store';

const inter = Inter({ subsets: ['latin'] });

const PerlinSketchNoSSR = dynamic(() => import('../components/perlin'), {
  ssr: false,
});

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <ReduxProvider store={store}>
      <Head>
        <style>{`
          @keyframes pulse-grow {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.25);
            }
          }
        `}</style>
      </Head>

      <div className='h-screen overflow-hidden'>
        <div className='flex flex-col h-full items-center justify-center relative'>
          <div className='-translate-x-1/2 absolute backdrop-blur-lg backdrop-filter bg-opacity-50 drop-shadow-lg font-bold left-1/2 m-4 p-2 text-9xl text-white top-1/4 transform z-10'>
            Dave.
          </div>

          <div
            className='absolute bottom-20 flex space-x-12'
            style={{ left: '50%', transform: 'translateX(-50%)' }}>
            <button
              className='animate-pulse-grow bg-black border border-white duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-white font-semibold hover:bg-white hover:text-black px-6 py-3 rounded shadow text-white transition'
              onClick={() => {
                window.location.href = '/dave';
              }}
              style={{ animation: 'pulse-grow 3s infinite' }}>
              Get Started
            </button>
          </div>
          {/* <PerlinSketchNoSSR /> */}
        </div>
        <main
          className={`flex min-h-screen flex-col items-center justify-center ${inter.className}`}></main>
      </div>
    </ReduxProvider>
  );
}
