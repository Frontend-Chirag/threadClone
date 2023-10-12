"use client";

import { deleteThread } from "@/lib/actions/thread.action";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useState } from "react";




interface Props {
    threadId: string;
    currentUserId: string;
    authorId: string;
    parentId: string | null;
}

function DeleteThread({ threadId, currentUserId, authorId, parentId, }: Props) {
    const pathname = usePathname();
    const router = useRouter();
    const [options, setOptions] = useState(false);

    const handleOptions = () => {
        setOptions(!options);
    }

    if (currentUserId !== authorId) return null;

    return (
        <div >
            <Button onClick={handleOptions} className="absolute right-0   
             z-20 bg-transparent 
                 top-5">
                <svg fill="#fff" xmlns="http://www.w3.org/2000/svg"
                    width="16px" height="16px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52"
                    xmlSpace="preserve">
                    <path d="M20,44c0-3.3,2.7-6,6-6s6,2.7,6,6s-2.7,6-6,6S20,47.3,20,44z M20,26c0-3.3,2.7-6,6-6s6,2.7,6,6s-2.7,6-6,6
	               S20,29.3,20,26z M20,8c0-3.3,2.7-6,6-6s6,2.7,6,6s-2.7,6-6,6S20,11.3,20,8z"/>
                </svg>
            </Button>

            <div className={`flex flex-col gap-5 mt-10 w-full 
                transition-all ease-in-out duration-500 justify-center 
                items-center py-5 bg-black px-1
                 absolute z-30 ${options ? '-top-4' : '-top-[200%]'} `}>
                <p className="text-light-2 cursor-pointer">Edit</p>
                <Image
                    src='/delete.svg'
                    alt="deete"
                    width={18}
                    height={18}
                    className="cursor-pointer  object-contain"
                    onClick={async () => {
                        await deleteThread(JSON.parse(threadId), pathname)
                        if (!parentId) {
                            router.push('/')
                        }
                    }}
                />
            </div>

        </div>

    );
}

export default DeleteThread;