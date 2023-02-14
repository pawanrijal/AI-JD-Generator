import Head from 'next/head'
import { Inter } from '@next/font/google'
import Dashboard from './components/Dashboard';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Ai Job description Generator</title>
        <meta name="description" content="Job Description Generator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className='flex justify-center mt-6'>
          <h1 className="text-5xl font-bold">Ai Job Description Generator</h1>
        </div>
        <div className='flex justify-center mt-6'>
          <h3 className="text-3xl">Powered by Open AI</h3>
        </div>
        <Dashboard/>
      </main>
    </>
  )
}
