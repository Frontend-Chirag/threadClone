

import { formatDateString } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import LikeThread from "../shared/LikeThread";


interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  image: string;
  author: {
    name: string,
    image: string,
    id: string
  };
  createdAt: string;
  community: {
    id: string,
    name: string,
    image: string
  } | null;
  comments: {
    author: {
      image: string;
    }
  }[];
  isComments?: boolean;
  likes?: string;
}

const ThreadCard = ({ id, currentUserId, parentId, content, author, image,
   createdAt, community, comments, isComments, likes}: Props) => {
   

 
  return (
    <article className={`flex flex-col w-full  ${isComments ?
      'px-0 xs:px-7' : ' border-t-2 border-neutral-900 pt-7 '}`}>
      <div className="flex  items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className='flex flex-col items-center'>
            <Link
              href={`/profile/${author.id}`}
              className="relative h-11 w-11"
            >
          s    <Image
                src={author.image}
                alt="author image"
                fill
                className="cursor-pointer object-cover rounded-full"
              />
            </Link>

            <div className='thread-card_bar' />
          </div>

          <div className='flex w-full flex-col relative'>
            <Link
              href={`/profile/${author.id}`}
              className="w-fit"
            >
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {author.name}
              </h4>
            </Link>

            <p className='mt-2 text-small-regular text-light-2'>{content}</p>

            {image ? (
              <div className="w-full rounded-lg overflow-hidden mt-5 flex justify-center ite">

                <Image
                  src={image}
                  width={400}
                  height={400}
                  alt="image"
                  className=" !w-full object-cover"
                />
              </div>
            ) : null

            }

            <div className={`${isComments && 'mb-10'} mt-5 flex flex-col gap-3`}>
              <div className="flex gap-3.5 w-full h-[70px]  justify-start items-start">
                <LikeThread
                  currentUserId={currentUserId}
                  id={id}
                />
                <Link href={`/thread/${id}`}>
                <svg fill="gray" width="19px" height="19px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8,11a1,1,0,1,0,1,1A1,1,0,0,0,8,11Zm4,0a1,1,0,1,0,1,1A1,1,0,0,0,12,11Zm4,0a1,
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
          </div>
        </div>

      </div>
      {!isComments && community && (
        <Link href={`/communities/${community.id}`} className="mt-5 flex items-center" >
          <p className="text-subtle-medium text-gray-1">
            {formatDateString(createdAt)}
            {" "}- {community.name} Community
          </p>
          <Image
            src={community.image}
            alt={community.name}
            width={24}
            height={24}
            className="ml-1 object-cover rounded-full"
          />
        </Link>
      )}
    </article>
  )
}

export default ThreadCard



