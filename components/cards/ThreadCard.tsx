import { formatDateString } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface Props {
     id :  string ;
     currentUserId : string  ;
     parentId :  string | null ;
     content : string  ;
     author : { 
         name: string, 
         image: string, 
         id: string
     };
     createdAt: string;
     community : { 
         id: string , 
         name: string , 
         image: string
      } | null;
     comments : { 
         author: {
             image: string; 
         }
     }[];
     isComments?: boolean;
}

const ThreadCard = ({ id ,currentUserId ,parentId ,content ,author ,createdAt ,community ,comments, isComments}: Props) => {
  return (
    <article className={`flex flex-col w-full  ${isComments ? 'px-0 xs:px-7' :' border-t-2 border-neutral-900 p-7' }`}>
        <div className="flex  items-start justify-between">
            <div className="flex w-full flex-1 flex-row gap-4">
                <div className='flex flex-col items-center'>
                    <Link
                     href={`/profile/${author.id}`}
                     className="relative h-11 w-11"
                    >
                     <Image
                      src={author.image}
                      alt="author image"
                      fill 
                      className="cursor-pointer object-cover rounded-full"
                     />
                    </Link>
                    <div className='thread-card_bar'/>
                </div>

                <div className='flex w-full flex-col'>
                    <Link 
                      href={`/profile/${author.id}`} 
                      className="w-fit"
                      >
                        <h4 className="cursor-pointer text-base-semibold text-light-1">
                            {author.name}
                        </h4>
                    </Link>

                    <p className='mt-2 text-small-regular text-light-2'>{content}</p>

                    <div className={`${isComments && 'mb-10'} mt-5 flex flex-col gap-3`}>
                      <div className="flex gap-3.5">
                         <Image
                          src='/heart-gray.svg'
                          alt='heart'
                          width={24}
                          height={24}
                          className="cursor-pointer object-contain"
                         />
                         <Link href={`/thread/${id}`}>
                          <Image
                            src='/reply.svg'
                            alt='reply'
                            width={24}
                            height={24}
                            className="cursor-pointer object-contain"
                          />
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



