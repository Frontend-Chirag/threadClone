"use client"

import { CommentValidation } from "@/lib/validation/thread";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import { addCommentToThread } from "@/lib/actions/thread.action";

interface Props {
    threadId: string;
    currentUserImg: string;
    currentUserId: string;
}

const Comment = ({ threadId, currentUserImg, currentUserId }: Props) => {

    const router = useRouter();
    const pathname = usePathname();

    const form = useForm({
         resolver: zodResolver(CommentValidation),
         defaultValues : {
            thread:''
        }
    })

    const onsubmit =  async (values: z.infer<typeof CommentValidation>) => {
      await addCommentToThread({
        threadId: threadId,
        commentText: values.thread,
        userId: JSON.parse(currentUserId),
        path: pathname 
      })
      form.reset();
    }

 return (
  <Form {...form}>
   <form
    className="comment-form"
    onSubmit={form.handleSubmit(onsubmit)}
   >
     <FormField
      control={form.control}
      name="thread"
      render={({ field }) => (
      <FormItem className=" flex items-center gap-3 w-full">
        <FormLabel className="rounded-full w-12 h-12 overflow-hidden">
           <Image
            src={currentUserImg}
            alt="current user img"
            width={48}
            height={48}
            className="object-cover"
           />
        </FormLabel>
        <FormControl className="border-none bg-transparent ">
          <Input
           type="text"
           placeholder="Comment..."
           className="no-focus text-light-1 outline-none"
           {...field}
          />
        </FormControl>
      </FormItem>
      )}
     />
     <Button className="comment-form_btn border-none">
        Reply
    </Button>
   </form>
  </Form>

 )
}
export default Comment;