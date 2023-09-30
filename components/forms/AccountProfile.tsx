"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { UserValidation } from "@/lib/validation/user";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { Button } from "../ui/button";
import Image from "next/image" ;
import { ChangeEvent, useState } from "react";
import { Textarea } from "../ui/textarea";
import { useRef } from "react";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";

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

const AccountProfile = ({ user, btnTitle }: Props) => {
    
    const [ files, setFiles ] = useState<File[]>([]); 
    const imageRef = useRef<HTMLInputElement>(null);
    const { startUpload } = useUploadThing("media");
    const pathname = usePathname();
    const router = useRouter();

    const handleRef = () => {
        imageRef.current;
    }

    const form = useForm({
        resolver: zodResolver(UserValidation),
        defaultValues:{
           profile_photo: user?.image || "",
           name: user?.name || "",
           username:user?.username || "",
           bio: user?.bio || "",
        }
    });

    const handleImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
     e.preventDefault();

      const fileReader = new FileReader();
      
      if(e.target.files && e.target.files.length > 0 ) {
         const file = e.target.files[0];

         setFiles(Array.from(e.target.files));

         if(!file.type.includes('image')) return;
        
         fileReader.onload = async (event) => {
            const imageDataUrl = event.target?.result?.toString() || '';
    
            fieldChange(imageDataUrl);
         }
         fileReader.readAsDataURL(file)
      }
    }

   const onSubmit = async (values: z.infer<typeof UserValidation>) =>  {
         const blob = values.profile_photo;

         const hasImageChanged =  isBase64Image(blob);

         if(hasImageChanged) {
          const imgRes = await startUpload(files)

          if(imgRes && imgRes[0].fileUrl) {
            values.profile_photo = imgRes[0].fileUrl;
          }
         }

       await updateUser({
          userId: user.id,
          username: values.username,
          name: values.name,
          image: values.profile_photo,
          bio: values.bio,
          path: pathname
       });

       if(pathname === '/profile/edit'){
        router.back();
       } else {
        router.push('/');
       }

  }

  return (

    <Form {...form}>
      <form 
       onSubmit={form.handleSubmit(onSubmit)} 
       className="flex flex-col justify-start gap-10"
       >
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex items-center flex-col justify-center gap-4 relative">
              <FormLabel className='account-form_image-label'>
                { field.value 
                 ? (
                   <div className=" w-[100px] h-[100px] 
                   flex justify-center items-center 
                   overflow-hidden rounded-full">
                     <Image 
                       src={field.value}
                       alt="profile photo"
                       width={100}
                       height={100}
                       priority
                       className=" object-cover "
                       />   
                      </div>
                   )
                 : (
                    <div className="relative w-full h-fit flex-col text-3xl flex justify-center items-center">
                    <Image 
                    src='profile.svg'
                    alt="profile photo"
                    width={48}
                    height={48}
                    priority
                    className="rounded-full object-cover cursor-pointer"
                    onClick={handleRef}
                    />   
                      <p className="text-white absolute right-2 top-full cursor-pointer" 
                      onClick={handleRef}>+</p>
                    </div>
                   )
                }
              </FormLabel>
              <FormLabel className='text-white cursor-pointer' onClick={handleRef}>
                Upload your Image </FormLabel>
              <FormControl className='flex-1 text-base-semibold text-gray-200'>
                <Input 
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />

      <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start gap-3 w-full">
            <FormLabel className='text-base=semibold  text-light-2'>
              Username
            </FormLabel>
            <FormControl className='flex-1 text-base-semibold text-gray-200'>
                <Input 
                  type="text"
                  className="account-form_input rounded-full"
                 {...field}
                 ref={imageRef}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start gap-3 w-full">
              <FormLabel className='text-base=semibold  text-light-2'>
                name
              </FormLabel>
              <FormControl className='flex-1 text-base-semibold text-gray-200'>
                <Input 
                  type="text"
                  className="account-form_input"
                 {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start gap-3 w-full">
              <FormLabel className='text-base=semibold  text-light-2'>
               Bio
              </FormLabel>
              <FormControl className='flex-1 text-base-semibold text-gray-200'>
                <Textarea 
                  rows={5}
                  className="account-form_input"
                 {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-primary-500">Submit</Button>
      </form>
    </Form>
  )
}

export default AccountProfile