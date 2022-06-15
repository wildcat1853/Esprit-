import {useState, useEffect} from 'react'
import {client, recommendProfiles} from '../api'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {

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
       
        <div className='hidden-main-container'>
         
          {
            profiles.map((profile, index) => (
            
              <Link href={`/profile/${profile.id}`} key={index}>
                <a>
                  <div >
                    {

                      profile.picture ? (
                        <Image 
                        src = {profile.picture.original.url }
                        width = '60px'
                        height = '60px' 
                        border-radius = '50%'
                        />
                      ) :(
                        <div style={{width: '60px', height: '60px', backgroundColor: 'black'}}></div>
                      )
                    }
                     
                        <h3 >{profile.name}</h3>
                        <p >{profile.handle}</p>
                        <p >{profile.bio}</p>
                   
                  </div>
                </a>
              </Link>
            ))
          }
        </div>
      </div>
   
  )
}
