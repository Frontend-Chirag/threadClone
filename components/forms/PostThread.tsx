"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter } from "next/navigation";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "../ui/button";
import { ThreadValidation } from "@/lib/validation/thread";
import { createThread } from "@/lib/actions/thread.action";
import { useOrganization } from "@clerk/nextjs";
import { Input } from "../ui/input";
import Image from "next/image";

// import { updateUser } from "@/lib/actions/user.actions";
interface Props {
  userId: string;
  username: string;
  imgUrl: string;
}


function PostThread({ userId , username, imgUrl }: Props ){

    const pathname = usePathname();
    const router = useRouter();
    const { organization } = useOrganization();


    const form = useForm({
        resolver: zodResolver(ThreadValidation),
        defaultValues:{
          thread:"",
          accountId: userId,

        }
    });

    const onsubmit = async (values: z.infer<typeof ThreadValidation>) => {
      console.log('community:',organization)
      await createThread({
        text: values.thread ,
        author: userId ,
        communityId: organization ? organization.id : null ,
        path: pathname ,
       }) ;
       
       router.push('/')
       
    }

  return(
    <Form {...form}>
        <form  
         className="flex flex-col justify-start gap-10 items-end"
         onSubmit={form.handleSubmit(onsubmit)}
         >
         <FormField 
          control={form.control}
          name="thread"
          render={({ field }) => (
              <FormItem className="mt-10 flex flex-1 relative items-start gap-3 w-full">
               <div className='flex flex-col items-center '>
                <div className="w-[80px] h-[80px] flex justify-center items-center rounded-full overflow-hidden">
                     <Image
                      src={imgUrl}
                      alt="Profile image"
                      width={80}
                      height={80}
                      className=" !w-[80px] object-cover !h-[80px] "
                     />
                </div>
                    <div className='Post-thread-card_bar'/>
                    <div className="w-[30px] h-[30px] flex opacity-[0.5] justify-center items-center rounded-full overflow-hidden">
                     <Image
                      src={imgUrl}
                      alt="Profile image"
                      width={30}
                      height={30}
                      className=" !w-[30px] object-cover !h-[30px] "
                     />
                   </div>
                </div>
                      <p className="text-neutral-800 absolute bottom-1 left-[70px] flex">
                        Add a thread
                      </p>
                <section className="flex flex-col w-full gap-2">
                 <FormLabel className='text-base-medium text-gray-1 '>
                  @{username}
                 </FormLabel>
                 <FormControl className="no-focus border-none !p-0 bg-black  text-light-2">
                    <Input
                      type="text"
                      placeholder="start a thread"
                     {...field}
                    />
                 </FormControl>
                </section>
              </FormItem>
          )}
          />
          <Button className=" bg-black text-primary-500 w-[80px] h-[50px]">
            Post 
          </Button>
        </form>
    </Form>
  )
}
export default PostThread;