"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter } from "next/navigation";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "../ui/button";
import { ThreadValidation } from "@/lib/validation/thread";
import { createThread } from "@/lib/actions/thread.action";
import { useOrganization } from "@clerk/nextjs";
import { Input } from "../ui/input";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";

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
    const imageRef = useRef<HTMLInputElement>(null);
    const [ files, setFiles ] = useState<File[]>([]); 
    const { startUpload } = useUploadThing("media");

    
    const handleRef = () => {
      if(imageRef.current){
        imageRef.current.click();
      }
  
  }
 
  const handleImage = (e: ChangeEvent<HTMLInputElement>,fieldChange: (value: string) => void) => {
   e.preventDefault();

   const fileReader = new FileReader();

   if (e.target.files && e.target.files.length > 0) {
     const file = e.target.files[0];
 
     if (!file.type.includes("image")) return;

     setFiles(Array.from(e.target.files));
 
     // Use onload event to set the result after the file has been read.
     fileReader.onload = (event) => {
      const imageDataUrl = event.target?.result?.toString() 
            || '';
       fieldChange(imageDataUrl); // Set the file to the state
        // If you want to update the form field with the image data URL
     };
 
     // Start reading the file
     fileReader.readAsDataURL(file);
   }
  }


    const form = useForm({
        resolver: zodResolver(ThreadValidation),
        defaultValues:{
          thread:"",
          accountId: userId,
          image: ""
        }
    });

    const onsubmit = async (values: z.infer<typeof ThreadValidation>) => {
      const blob = values.image;
  
      const hasImageChanged = isBase64Image(blob);
      if (hasImageChanged) {
        const imgRes = await startUpload(files);
  
        if (imgRes && imgRes[0].fileUrl) {
          values.image = imgRes[0].fileUrl;
        }
      }

      await createThread({
        text: values.thread ,
        author: userId ,
        communityId: organization ? organization.id : null ,
        path: pathname ,
        image: values.image
       }) ;
       
       router.push('/')
       
    }

  return(
    <Form {...form}>
        <form  
         className="flex flex-col justify-start gap-2 items-end"
         onSubmit={form.handleSubmit(onsubmit)}
         >
        
         <FormField 
          control={form.control}
          name="thread"
          render={({ field }) => (
              <FormItem className="mt-10 flex flex-1 relative items-start gap-3 w-full">
               <div className='flex flex-col w-full '>
                <div className="flex w-full gap-5 " >
                <div className="sm:w-[90px] sm:h-[80px] w-[80px] h-[60px] border-2 flex justify-center items-center rounded-full overflow-hidden">
                     <Image
                      src={imgUrl}
                      alt="Profile image"
                      width={80}
                      height={80}
                      className=" sm:w-[80px] sm:h-[80px] w-[60px] h-[60px] object-cover"
                      />
                </div>
                <section className="flex flex-col w-full gap-2 ">
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
                <FormLabel className='text-white cursor-pointer opacity-[0.5]'  onClick={handleRef}>
               {files.length === 0 && (
                <svg fill="gray" width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.08,12.42,11.9,18.61a4.25,4.25,0,0,1-6-6l8-8a2.57,2.57,0,0,1,3.54,0,2.52,2.52,0,0,1,0,3.54l-6.9,6.89A.75.75,0,1,1,9.42,14l5.13-5.12a1,1,0,0,0-1.42-1.42L8,12.6a2.74,2.74,0,0,0,0,3.89,2.82,2.82,0,0,0,3.89,0l6.89-6.9a4.5,4.5,0,0,0-6.36-6.36l-8,8A6.25,6.25,0,0,0,13.31,20l6.19-6.18a1,1,0,1,0-1.42-1.42Z"/>
                </svg>
               )}
                </FormLabel> 
                </section>
             </div>
              
                </div>
              </FormItem> 
          )}
          />
           <FormField 
            control={form.control}
            name="image"
            render={({field}) => (
              <section className="w-full flex px-8  mb-5 mt-2" >
                  <FormControl className='flex-1 text-base-semibold text-gray-200'>
                <Input 
                  ref={imageRef}
                  type="file"
                  accept='image/*'
                  className="hidden" 
                  onChange={(e) => 
                    handleImage(e, field.onChange)}
                />
              </FormControl>  
              <div className={` w-full flex justify-center border-l-2 
               border-neutral-900  items-center ${field.value ? 'h-auto' : 'h-28'}`}>
                { field.value && (

                  <Image
                  width={500}
                  height={400}
                  src={field.value}
                  alt=" image"
                  className="object-cover rounded-2"
                  />
                  )
                }  
              
              </div>
           </section>
  )}
          />
          <div className="flex w-full gap-4 justify-start items-center mb-10  px-2">
                        <div className="sm:w-[55px] sm:h-[40px] w-[45px]  h-[30px] flex opacity-[0.5] 
                                       justify-center items-center rounded-full overflow-hidden">
                                <Image
                                 src={imgUrl}
                                 alt="Profile image"
                                 width={40}
                                 height={40}
                                 className="object-cover sm:w-[40px] rounded-full sm:h-[40px] w-[30px] h-[30px]  "
                                 />
                        </div>
                          <p className="text-neutral-800 flex">
                             Add a thread
                          </p>
                     </div>
          <Button className=" bg-black text-primary-500 w-[80px] h-[50px]">
            Post 
          </Button>
        </form>
    </Form>
  )
}
export default PostThread;