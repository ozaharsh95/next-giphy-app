import Head from 'next/head'
import Image from 'next/image'
import Login from '../components/Login'
import UserDashboard from '../components/UserDashboard'
import { useAuth } from '../context/AuthContext'

  
export default function Home() {
  const { currentUser } = useAuth()

  return (
    < >
      <Head>
        <title>Giphy GIFs</title>
        <meta name="description" content="Generated by cGiphy GIFs" />
        <link rel="icon" href="https://fav.farm/🚀" />
      </Head>
      
      {!currentUser && <Login />}
      {currentUser && <UserDashboard/>}
    </>
  )
}