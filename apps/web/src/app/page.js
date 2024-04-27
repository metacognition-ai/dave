export default function Home() {
  return (
    <main className='flex flex-col items-center justify-between min-h-screen p-24'>
      <div className='font-mono items-center justify-between lg:flex max-w-5xl text-sm w-full z-10'>
        <p className='backdrop-blur-2xl bg-gradient-to-b border-b border-gray-300 dark:bg-zinc-800/30 dark:border-neutral-800 dark:from-inherit fixed flex from-zinc-200 justify-center left-0 lg:bg-gray-200 lg:border lg:dark:bg-zinc-800/30 lg:p-4 lg:rounded-xl lg:static lg:w-auto pb-6 pt-8 top-0 w-full'>
          Get started by editing&nbsp;
          <code className='font-bold font-mono'>src/app/page.js</code>
        </p>
        <div className='bg-gradient-to-t bottom-0 dark:from-black dark:via-black fixed flex from-white h-48 items-end justify-center left-0 lg:bg-none lg:h-auto lg:static lg:w-auto via-white w-full'>
          <a
            className='flex gap-2 lg:p-0 lg:pointer-events-auto p-8 place-items-center pointer-events-none'
            href='https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
            target='_blank'
            rel='noopener noreferrer'>
            By{' '}
            <Image
              src='/vercel.svg'
              alt='Vercel Logo'
              className='dark:invert'
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="after:-z-20 after:absolute after:bg-gradient-conic after:blur-2xl after:content-[''] after:dark:from-sky-900 after:dark:opacity-40 after:dark:via-[#0141ff] after:from-sky-200 after:h-[180px] after:translate-x-1/3 after:via-blue-200 after:w-full before:-translate-x-1/2 before:absolute before:bg-gradient-radial before:blur-2xl before:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:opacity-10 before:dark:to-blue-700 before:from-white before:h-[300px] before:lg:h-[360px] before:rounded-full before:to-transparent before:w-full flex place-items-center relative sm:after:w-[240px] sm:before:w-[480px] z-[-1]">
        <Image
          className='dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert relative'
          src='/next.svg'
          alt='Next.js Logo'
          width={180}
          height={37}
          priority
        />
      </div>

      <div className='grid lg:grid-cols-4 lg:max-w-5xl lg:mb-0 lg:text-left lg:w-full mb-32 text-center'>
        <a
          href='https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
          className='border border-transparent group hover:bg-gray-100 hover:border-gray-300 hover:dark:bg-neutral-800/30 hover:dark:border-neutral-700 px-5 py-4 rounded-lg transition-colors'
          target='_blank'
          rel='noopener noreferrer'>
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{' '}
            <span className='group-hover:translate-x-1 inline-block motion-reduce:transform-none transition-transform'>
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href='https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
          className='border border-transparent group hover:bg-gray-100 hover:border-gray-300 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30 hover:dark:border-neutral-700 px-5 py-4 rounded-lg transition-colors'
          target='_blank'
          rel='noopener noreferrer'>
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Learn{' '}
            <span className='group-hover:translate-x-1 inline-block motion-reduce:transform-none transition-transform'>
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href='https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
          className='border border-transparent group hover:bg-gray-100 hover:border-gray-300 hover:dark:bg-neutral-800/30 hover:dark:border-neutral-700 px-5 py-4 rounded-lg transition-colors'
          target='_blank'
          rel='noopener noreferrer'>
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{' '}
            <span className='group-hover:translate-x-1 inline-block motion-reduce:transform-none transition-transform'>
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href='https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
          className='border border-transparent group hover:bg-gray-100 hover:border-gray-300 hover:dark:bg-neutral-800/30 hover:dark:border-neutral-700 px-5 py-4 rounded-lg transition-colors'
          target='_blank'
          rel='noopener noreferrer'>
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Deploy{' '}
            <span className='group-hover:translate-x-1 inline-block motion-reduce:transform-none transition-transform'>
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
