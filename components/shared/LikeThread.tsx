"use client";

import { checkInitialLikeState, likeThread } from '@/lib/actions/thread.action';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'



interface Props {
    currentUserId: string;
    id: string;
    like: boolean;
    likecount: number;
    popAnimation: boolean;
    setPopAnimation: Dispatch<SetStateAction<boolean>>;
    setLike: Dispatch<SetStateAction<boolean>>;
    setLikeCount: Dispatch<SetStateAction<number>>;
}


const LikeThread = ({ 
   currentUserId, 
   id, 
   like, 
   likecount,  
   popAnimation, 
   setPopAnimation, 
   setLike, 
   setLikeCount
    
}: Props) => {

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
      }, [currentUserId, id]);

    const likeThreads = async () => {
        console.log("Like button clicked");
      const updatedLikeCount =  await likeThread({
            userId: currentUserId,
            threadId: id,
        });
        setPopAnimation(true);
        setTimeout(() => setPopAnimation(false), 1000);
        setLike(!like)
        setLikeCount(updatedLikeCount)
    }

    return (
        <div className='flex flex-col items-start relative'>
            {!like ?
              <svg width="19px" height="19px" viewBox="0 0 96 96"
              className={` ${popAnimation && 'likeButton' } cursor-pointer`} onClick={likeThreads} xmlns="http://www.w3.org/2000/svg" 
              xmlnsXlink="http://www.w3.org/1999/xlink">
              <defs>
                <clipPath id="clip-heart">
                  <rect width="96" height="96"/>
                </clipPath>
              </defs>
              <g id="heart" clipPath="url(#clip-heart)">
                <g id="pills" transform="translate(-116 -232)">
                  <g id="Group_150" data-name="Group 150">
                    <path id="Path_180" data-name="Path 180" 
                    d="M164,247.762c-.092-.1-.184-.194-.276-.286A25.568,25.568,0,1,0,127.5,283.57c.1.1.2.2.316.3h0L164,320l36.224-36.093-.041-.041c.112-.092.214-.194.316-.3a25.568,25.568,0,1,0-36.223-36.094C164.184,247.568,164.092,247.66,164,247.762Z" fill="none" 
                    stroke="#58595b" strokeLinecap="round" strokeLinejoin="round" 
                    strokeWidth="4"/>
                  </g>
                </g>
              </g>
            </svg>
                :
                <svg width="24px" height="24px"  className={`${popAnimation && 'likeButton' } cursor-pointer`}
                onClick={likeThreads} viewBox="0 0 24 24"
                 fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.1315 3.71436C14.4172 3.71436 12.9029 4.57721 12 5.8915C11.0972 4.57721 9.58289 3.71436 7.86861 3.71436C5.10289 3.71436 2.85718 5.96007 2.85718 8.72578C2.85718 14.8344 12 20.3258 12 20.3258C12 20.3258 21.1429 14.8344 21.1429 8.72578C21.1429 5.96007 18.8972 3.71436 16.1315 3.71436Z" fill="url(#paint0_radial)" />
                    <path opacity="0.5" d="M18.2056 4.16016C20.9485 8.53158 18.4228 14.2687 15.3885 15.8973C12.0399 17.6973 9.74847 16.8516 5.00562 14.1602C7.70847 17.743 11.9999 20.3202 11.9999 20.3202C11.9999 20.3202 21.1428 14.8287 21.1428 8.72016C21.1428 6.6973 19.937 4.94873 18.2056 4.16016Z" fill="url(#paint1_radial)" />
                    <path opacity="0.5" d="M16.1315 3.71436C14.4172 3.71436 12.9029 4.57721 12 5.8915C11.0972 4.57721 9.58289 3.71436 7.86861 3.71436C5.10289 3.71436 2.85718 5.96007 2.85718 8.72578C2.85718 14.8344 12 20.3258 12 20.3258C12 20.3258 21.1429 14.8344 21.1429 8.72578C21.1429 5.96007 18.8972 3.71436 16.1315 3.71436Z" fill="url(#paint2_radial)" />
                    <path opacity="0.5" d="M16.1315 3.71436C14.4172 3.71436 12.9029 4.57721 12 5.8915C11.0972 4.57721 9.58289 3.71436 7.86861 3.71436C5.10289 3.71436 2.85718 5.96007 2.85718 8.72578C2.85718 14.8344 12 20.3258 12 20.3258C12 20.3258 21.1429 14.8344 21.1429 8.72578C21.1429 5.96007 18.8972 3.71436 16.1315 3.71436Z" fill="url(#paint3_radial)" />
                    <path opacity="0.24" d="M10.7486 5.74883C11.2514 6.93169 10.1371 8.5374 8.25714 9.33169C6.37714 10.126 4.45143 9.8174 3.94857 8.64026C3.44571 7.46312 4.56 5.85169 6.44 5.0574C8.32 4.26312 10.2457 4.56597 10.7486 5.74883Z" fill="url(#paint4_radial)" />
                    <path opacity="0.24" d="M16.8742 4.78885C17.5885 5.57742 17.1485 7.13742 15.8971 8.26885C14.6456 9.40028 13.0513 9.68028 12.3371 8.8917C11.6228 8.10313 12.0628 6.54313 13.3142 5.41171C14.5656 4.28028 16.1599 4.00028 16.8742 4.78885Z" fill="url(#paint5_radial)" />
                    <path opacity="0.32" d="M16.2229 5.04578C18.7372 5.90293 21.1372 9.61721 17.0801 14.2458C14.6515 17.0172 12.0001 18.4172 8.62866 17.8686C10.4515 19.3886 12.0058 20.3258 12.0058 20.3258C12.0058 20.3258 21.1487 14.8344 21.1487 8.72578C21.1429 5.96007 18.8972 3.71436 16.1315 3.71436C14.4172 3.71436 12.9029 4.57721 12.0001 5.8915C12.0001 5.8915 14.3829 4.41721 16.2229 5.04578Z" fill="url(#paint6_linear)" />
                    <defs>
                        <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(9.38479 8.34769) rotate(-29.408) scale(14.3064 11.3486)">
                            <stop offset="0.2479" stopColor="#FF0000" />
                            <stop offset="0.8639" stopColor="#C20000" />
                        </radialGradient>
                        <radialGradient id="paint1_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(9.7385 7.47018) rotate(-29.408) scale(12.3173 9.77078)">
                            <stop offset="0.2479" stopColor="#FF0000" />
                            <stop offset="1" stopColor="#C20000" />
                        </radialGradient>
                        <radialGradient id="paint2_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(9.38479 8.34769) rotate(-29.408) scale(14.3064 11.3486)">
                            <stop stopColor="white" stopOpacity="0.25" />
                            <stop offset="1" stopColor="white" stopOpacity="0" />
                        </radialGradient>
                        <radialGradient id="paint3_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(14.5277 13.2044) rotate(-26.296) scale(10.4431 5.16038)">
                            <stop stopColor="#BD2719" stopOpacity="0.25" />
                            <stop offset="1" stopColor="#BD2719" stopOpacity="0" />
                        </radialGradient>
                        <radialGradient id="paint4_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(7.34746 7.19453) rotate(-21.6908) scale(3.71252 2.30616)">
                            <stop stopColor="white" />
                            <stop offset="1" stopColor="white" stopOpacity="0" />
                        </radialGradient>
                        <radialGradient id="paint5_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(14.6004 6.84619) rotate(-40.7634) scale(3.07376 1.9095)">
                            <stop stopColor="white" />
                            <stop offset="1" stopColor="white" stopOpacity="0" />
                        </radialGradient>
                        <linearGradient id="paint6_linear" x1="13.8868" y1="26.8498" x2="15.6583" y2="2.96408" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#860805" />
                            <stop offset="1" stopColor="#BD2719" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>
            }
         
             <p className="text-neutral-500 text-[15px] flex w-[50px] absolute 
             -bottom-[30px]">
                Likes {likecount}
            </p>
        </div>
    )
}

export default LikeThread;