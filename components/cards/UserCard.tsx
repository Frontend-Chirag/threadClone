"use client"

import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface Props{
    id: string;
    name: string;
    username: string;
    imgUrl: string;
    personType: string;
}

const UserCard = ({ id, name, username, imgUrl, personType }: Props) => {

    const router = useRouter();

  return (
    <article className="user-card mt-5">
       <div className='user-card_avatar '>
         <div className="flex justify-center items-center w-[48px] h-[48px] overflow-hidden rounded-full">
          <Image
           src={imgUrl}
           alt='logo'
           width={48}
           height={48}
           className='object-cover'
           />
         </div>

          <div className="flex-1 text-ellipsis">
             <h4 className="text-base-semibold text-light-1">{name}</h4>
             <p className="text-small-medium text-gray-1">@{username}</p>
          </div>
       </div>

       <Button className='user-card_btn' onClick={() => router.push(`/profile/${id}`)}>
        View
       </Button>
    </article>
  )
}

export default UserCard