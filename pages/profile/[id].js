import {useRouter} from 'next/router'
import {useState, useEffect} from 'react'
import { client, getProfiles, getPublications } from '../../api'
import Image from 'next/image'
import {ethers} from 'ethers'


import ABI from '../../abi.json'
const address = '0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d'

// react-twitter-ui imports 

import { BackIcon, NotificationIcon, MoreIcon, LocationIcon, HyperLinkIcon, Calendericon } from '../../public/images/svg/svgs';
// import { useHistory } from "react-router-dom";
import { SmallAvatar } from '../../public/images/avatars'

export default function Profile(){
    const [profile, setProfile] = useState()
    const [pubs, setPubs] = useState([])
    const router = useRouter()
    const {id} =  router.query
    useEffect(() => {
        fetchProfile()
    }, [id])
     
    async function fetchProfile()
{
    try {
        const response = await client.query(getProfiles, {id}).toPromise()
        console.log("Query response", response)
        setProfile(response.data.profiles.items[0])

        const publicationData = await client.query(getPublications,{id}).toPromise()
        
        // console.log("Publication data", publicationData.data.publications.items)
        setPubs(publicationData.data.publications.items)
        
    } catch (error) {
        
    }

}    



async function connect() {
    const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
    })

    console.log({accounts})
}

async function followUser(){

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

    const contract = new ethers.Contract(
        address,
        ABI,
        signer
    )

    try {

        const tx = contract.follow([id], [0x0])

        await tx.wait()
        console.log("followed user succesfuly!")
        
    } catch (error) {
        console.log({error})
    }


}

if (!pubs) return null
if (!profile) return null




console.log("Test data return", profile.picture.original.url)
return(


    <div></div>
//     <div className='parent-container'>
//   <div className='profile-container'>

//       {/* /* start */ }

//       {/* <button onClick={connect}>Connect</button> */}
//         <div>
//             {
//                 profile.coverPicture ? (
//                     <Image
//                     className="cover-picture"
//                     width = "600px"
//                     height = "130px"
//                     src={ profile.coverPicture.original.url} 
//                     />
//                 ) : (  <div style={{width: '100%', height: '200px', backgroundColor: 'black'}}></div>)
//             }
//         </div>
//         <div>
          
//            {
//                profile.picture ? (
//                    <Image
//                    className="profile-avatar"
//                    width = "130px"
//                    height = "130px"
//                    src={ profile.picture.original.url} 
//                    />
//                ) : (
//                 <div style={{width: '60px', height: '60px', backgroundColor: 'black'}}></div>
//                )
//            }
          
//         </div>
//         <h3> {profile.handle}</h3>
//          <h4> {profile.bio}</h4>  <br/>
//          <h4> Total followers {profile.stats.totalFollowers}</h4>  
//          <button onClick={followUser}>Follow user</button>


//          <div> {
//              pubs.map((pub, index) => (

//                  <div>
//                      {pub.metadata.content}
//                  </div>
//              ))
// }
//          </div>





//           {/* /* end */ }


       

//            </div>

//            </div>

    )
}