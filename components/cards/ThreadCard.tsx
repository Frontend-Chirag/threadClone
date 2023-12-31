
import { formatDateString } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import ImageThread from "../shared/ImageThread";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  image?: string;
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
  createdAt, community, comments, isComments, likes }: Props) => {

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
      
            <ImageThread      
            image={image}
            currentUserId={currentUserId}
            id={id}
            comments={comments}
            isComments={isComments}
            content={content}
            />
           
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



