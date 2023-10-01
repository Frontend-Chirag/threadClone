"use client"

import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";


interface Props {
    accountId: string;
    authUserId: string;
    name: string;
    username : string;
    imgUrl: string;
    bio: string;
    type?: 'User' | 'Community';
}

const ProfileHeader = ({ accountId, authUserId, name, username, imgUrl, bio ,type}: Props ) => {
   
   const auth = useAuth();

    return (
    <div className="flex w-full flex-col justify-start">
       <div className='flex items-center justify-between'>
          <div className='flex  w-full justify-between flex-col sm:flex-row sm:items-center items-start gap-3'>
            <div className="flex items-center gap-6">
             <div className="relative h-20 w-20 object-cover">
                <Image
                 src={imgUrl}
                 alt='profile image'
                 fill
                 className='rounded-full object-cover shadow-2xl'
                 />
             </div>
             <div className='flex-1'>
                <h2 className='text-left text-heading3-bold text-light-1'>
                    {name}
                </h2>
                <p className="text-base-medium text-gray-1">
                    @{username}
                </p>
             </div>
          </div>

           {
             accountId === authUserId  && 
            <>           
             <div className="hidden sm:flex  ">
                <Link href={`/profile/edit`}>
                  <Button className=" !bg-neutral-950 border-dark-3 border-2 px-10">
                     Edit Profile
                  </Button>
                </Link>
             </div>
            </>
           }
          </div>
          {/*TODO: community*/}
       </div>
          <p className="mt-4 max-w-lg text-base-regular text-light-2">
            {bio}   
          </p>
          {
           accountId === authUserId && 
            <>        
              <div className="flex mt-5 sm:hidden">
                <Link href={`/profile/edit`}>
                  <Button className=" !bg-neutral-950 border-dark-3 border-2 px-7">
                     Edit profile
                  </Button>
                </Link>
             </div>
            </>
          }
          <div className="mt-10 h-0.5 w-full bg-dark-3"></div>
    </div>
    )
}

export default ProfileHeader