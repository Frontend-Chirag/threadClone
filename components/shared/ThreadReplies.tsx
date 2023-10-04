
import Image from "next/image";
import Link from "next/link";



interface Props {
    id: string;
    text: string;
    name: string;
    imgurl: string;
    parentId:any;
}

const ThreadReplies = ({id ,text ,name ,imgurl,parentId }: Props) => {
  return (
    <article className={`flex flex-col w-full border-t-2  border-neutral-900 p-7`}>
        <div className="flex  items-start justify-between">
            <div className="flex w-full flex-1 flex-row gap-4 ">
                <div className='flex flex-col items-center'>
                    <Link
                     href={'/'}
                     className="relative h-11 w-11"
                    >
                     <Image
                      src={imgurl}
                      alt="author image"
                      fill 
                      className="cursor-pointer object-cover rounded-full"
                     />
                    </Link>
                    <div className='thread-card_bar'/>
                </div>

                <div className='flex w-full flex-col'>
                    <Link 
                      href={`/profile/${id}`} 
                      className="w-fit"
                      >
                        <h4 className="cursor-pointer text-base-semibold text-light-1">
                            @{name}
                        </h4>
                    </Link>

                    <p className='mt-2 text-small-regular text-light-2'>{text}</p>
                    <Link href={`/thread/${parentId}`} className="flex gap-1 mt-5 
                    mb-5 justify-start items-center">
                    <Image
                            src='/reply.svg'
                            alt='reply'
                            width={24}
                            height={24}
                            className="cursor-pointer object-contain"
                          />
                    <p className="text-neutral-400 text-subtle-semibold">reply</p>
                    </Link>
                </div>
            </div>

        </div>
            
    </article>
  )
}

export default ThreadReplies



