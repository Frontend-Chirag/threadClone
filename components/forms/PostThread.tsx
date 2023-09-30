"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter } from "next/navigation";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { ThreadValidation } from "@/lib/validation/thread";
import { createThread } from "@/lib/actions/thread.action";
import { useOrganization } from "@clerk/nextjs";

// import { updateUser } from "@/lib/actions/user.actions";
interface Props {
    user:{
        id: string,
        objectId: string,
        username: string,
        name:string,
        bio:string,
        image:string,
    };
    btnTitle:string;
}


function PostThread({ userId }: {userId: string}){

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
         className="flex flex-col justify-start gap-10"
         onSubmit={form.handleSubmit(onsubmit)}
         >
         <FormField 
          control={form.control}
          name="thread"
          render={({ field }) => (
              <FormItem className="mt-10 flex flex-col items-start gap-3 w-full">
                 <FormLabel className='text-base=semibold text-white'>
                 Content
                 </FormLabel>
                 <FormControl className="no-focus border border-dark-4 bg-dark-2 text-light-2">
                    <Textarea
                     rows={10}
                     {...field}
                    />
                 </FormControl>
              </FormItem>
          )}
          />
          <Button className="bg-primary-500">
            Post Thread
          </Button>
        </form>
    </Form>
  )
}
export default PostThread;