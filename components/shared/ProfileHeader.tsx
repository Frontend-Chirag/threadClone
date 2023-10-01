import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

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
    return (
    <div className="flex w-full flex-col justify-start">
       <div className='flex items-center justify-between'>
          <div className='flex relative w-full  items-center gap-3'>
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
             <div className="absolute right-6">
                <Link href={`/profile/edit`}>
                  <Button>
                     Edit Profile
                  </Button>
                </Link>
             </div>
          </div>
          {/*TODO: community*/}
       </div>
          <p className="mt-5 max-w-lg text-base-regular text-light-2">
            {bio}   
          </p>
          <div className="mt-10 h-0.5 w-full bg-dark-3"></div>
    </div>
    )
}

export default ProfileHeader