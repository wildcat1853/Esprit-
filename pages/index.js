import {useState, useEffect} from 'react'
import {client, recommendProfiles} from '../api'
import Link from 'next/link'
import Image from 'next/image'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'
import Login from '../components/Login'
import Modal from '../components/Modal'
import Widgets from '../components/Widgets'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import { getProviders, getSession, useSession } from "next-auth/react";


// next.js tutorial imports

import Head from 'next/head'

export default function Home({trendingResults, followResults, providers}) {

  // next-auth authentication -> replace with metamask logic later 
  const {data:session} = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);

  if (!session) return <Login providers={providers}/>

  // end of next-auth logic 

  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    fetchProfiles()
  }, [])

  async function fetchProfiles(){



    try {

      const response = await client.query(recommendProfiles).toPromise()
      console.log({ response })
      setProfiles(response.data.recommendedProfiles)
    }  catch (err){
      console.log({err})
    }
   

  }


  return (

    
      <div >
       <Head>
         <title>Twitter</title>
       </Head>

       <main className='bg-black min-h-screen flex max-w-[1500px] mx-auto'>
         <Sidebar/>
         <Feed/>
         <Widgets
          trendingResults={trendingResults}
          followResults={followResults}
        />
         {isOpen && <Modal/> }
       </main>
      </div>
   
  )
}



export async function getServerSideProps(context) {
  const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then(
    (res) => res.json()
  );
  const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
    (res) => res.json()
  );
  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    },
  };
}