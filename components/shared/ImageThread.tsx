"use client";

import Link from "next/link";
import LikeThread from "./LikeThread";
import LoadingStateImage from "./LoadingStateImage";
import Image from "next/image";
import { useEffect, useState } from "react";
import { checkInitialLikeState, likeThread } from "@/lib/actions/thread.action";

interface Props{
    image?:string;
    currentUserId:string;
    id:string;
    isComments?:boolean;
    comments: {
        author: {
          image: string;
        }
      }[];
      content:string;
}

const ImageThread = ({image, currentUserId, content , id, isComments, comments}:Props) => {

    const [like, setLike] = useState(false);
    const [likecount , setLikeCount] = useState(0);
    const [popAnimation, setPopAnimation] = useState(false);

    useEffect(() => {
      const checkInitialLike = async () => {
        const isLiked = await checkInitialLikeState({
          id: id,
          currentUserId: currentUserId,
        });
        const updatedLikeCount =  await likeThread({
          userId: currentUserId,
          threadId: id,
      });
       setLikeCount(updatedLikeCount)
       setLike(isLiked);
      };
      console.log(likecount, like)
  
      checkInitialLike();
    }, [currentUserId, id, ]);

  return (
    <>
    
    {image ? (
              <div className="w-full h-auto  relative rounded-lg overflow-hidden mt-5 flex justify-center 
              ">
                <LoadingStateImage
                  image={image}
                  currentUserId={currentUserId}
                  id={id}
                  popAnimation={popAnimation}
                  setPopAnimation={setPopAnimation}
                  setLike={setLike}
                  setLikeCount={ setLikeCount}
                />
              </div>
            ) : null

            }
            <p className='mt-4 mb-2 text-small-regular text-light-2'>{content}</p>

      <div className={`${isComments && 'mb-10'} mt-5 flex flex-col gap-3`}>
              <div className="flex gap-3.5 w-full h-[70px]  justify-start items-start">
                <LikeThread
                   currentUserId={currentUserId}
                   id={id}
                   like={like}
                   likecount={likecount}
                   popAnimation={popAnimation}
                   setPopAnimation={setPopAnimation}
                   setLike={setLike}
                   setLikeCount={setLikeCount}
                />
                <Link href={`/thread/${id}`}>
                  <svg fill="gray" width="19px" height="19px" viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg">
                    <path d="M8,11a1,1,0,1,0,1,1A1,1,0,0,0,8,11Zm4,0a1,1,0,1,0,1,1A1,1,0,0,0,12,11Zm4,0a1,
                1,0,1,0,1,1A1,1,0,0,0,16,11ZM12,2A10,10,0,0,0,2,12a9.89,9.89,0,0,0,2.26,6.33l-2,2a1,1,0,0,0-.21,1.09A1,1,0,0,0,3,22h9A10,10,0,0,0,12,2Zm0,18H5.41l.93-.93a1,1,0,0,0,.3-.71,1,1,0,0,0-.3-.7A8,8,0,1,1,12,20Z"/></svg>
                </Link>
                <Image
                  src='/repost.svg'
                  alt='repost'
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                <Image
                  src='/share.svg'
                  alt='share'
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
              </div>
              {isComments && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {comments.length} replies
                  </p>
                </Link>
              )}
            </div>
    </>
  )
}

export default ImageThread