import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {HomePage} from '../components/HomePage'
import {
 
  Box,

  } from '@mui/material';
export default function Home() {
  return (
    <div >
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main >
        <HomePage/>
      </main>

      <footer >
      <Box sx={{marginTop: 5}}/>
      </footer>
    </div>
  )
}
