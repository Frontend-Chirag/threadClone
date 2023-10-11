"use client";



import { checkInitialLikeState, likeThreadByImage } from '@/lib/actions/thread.action';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'


interface Props {
  image: string;
  currentUserId: string;
  id: string;
  popAnimation: boolean;
  setPopAnimation: Dispatch<SetStateAction<boolean>>;
  setLike: Dispatch<SetStateAction<boolean>>;
  setLikeCount: Dispatch<SetStateAction<number>>;

}

const LoadingStateImage = ({ 
  image, 
  currentUserId, 
  id, 
  popAnimation, 
  setPopAnimation, 
  setLike, 
  setLikeCount 

}: Props) => {

  const [loading, setloading] = useState(true);
  const [bigHeart, setBigHeart] = useState(false);

  useEffect(() => {
    const checkInitialLike = async () => {

      const isLiked = await checkInitialLikeState({
        id: id,
        currentUserId: currentUserId,
      });
      setLike(isLiked);
    };

    checkInitialLike();
  }, [currentUserId, id]);

  const likeThreads = async () => {
    try {
      setLike(true);
      // Call the asynchronous function
      const likeThreadImage = await likeThreadByImage({
        userId: currentUserId,
        threadId: id,
      });

      // Update state based on the result
      setLikeCount(likeThreadImage)
      setBigHeart(true)
      setPopAnimation(true);

      // Set like back to false and hide pop animation after 1000ms
      setTimeout(() => {
        setPopAnimation(false);
        setBigHeart(false)
      }, 1000);

    } catch (error) {
      // Handle errors if any
      console.error("Error liking thread:", error);
    }
  };


  useEffect(() => {
    const loadingState = () => {
      setTimeout(() => {

        setloading(false)
      }, 1000);
    }

    loadingState();
  }, []);

  return (
    <div className='relative  w-full h-auto  '>
      {loading && (
        <div className="w-full top-0 z-10 left-0 absolute h-full flex justify-center
         items-center glasseffect z-1 ">
          <div className='w-[200px] h-[200px] rounded-full border-2 border-white '></div>
        </div>
      )}
      <div onDoubleClick={likeThreads} className='absolute bg-[rgba(255,255,255,0.01)] z-20 flex justify-center items-center  w-full h-full top-0 left-0'>

        {bigHeart && (
          <svg fill="white" onClick={likeThreads} 
            className={`${popAnimation && 'likeButton'} cursor-pointer
         sm:w-[200px] sm:h-[200px] w-[100px] h-[100px]`} viewBox="0 0 36 36"
            version="1.1"
            preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink">
            <title>heart-solid</title>
            <path d="M33,7.64c-1.34-2.75-5.2-5-9.69-3.69A9.87,9.87,0,0,0,18,7.72a9.87,9.87,0,0,0-5.31-3.77C8.19,2.66,4.34,4.89,3,7.64c-1.88,3.85-1.1,8.18,2.32,12.87C8,24.18,11.83,27.9,17.39,32.22a1,1,0,0,0,1.23,0c5.55-4.31,9.39-8,12.07-11.71C34.1,15.82,34.88,11.49,33,7.64Z"
              className="clr-i-solid clr-i-solid-path-1 "></path>
            <rect x="0" y="0" width="36" height="36"
              fillOpacity="0" />
          </svg>
        )}


      </div>

      <Image
        src={image}
        width={200}
        height={200}
        alt="image"
        className="  w-full h-auto object-cover"
      />
    </div>
  )
}

export default LoadingStateImage