"use client";

import { sidebarLinks } from '@/contants';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {SignedIn, SignOutButton, useAuth } from '@clerk/nextjs';

function LeftSidebar() {

    const router = useRouter();
    const pathName = usePathname();
    const { userId } = useAuth();

    return(
        <section className="custom-scrollbar leftsidebar">
          <div className="flex w-full flex-1 flex-col gap-3 px-6">
          <Link href='/' className="flex items-center mb-10 gap-4">
              <Image 
                src='/logo.svg' 
                alt='logo' 
                width={28} 
                height={28}
              />
              <p className="text-heading3-bold text-light-1 max-xs:hidden">
                Threads
              </p>
          </Link>
            {sidebarLinks.map((link) => {
               const isActive = (
                pathName.includes(link.route) && 
                link.route.length > 1 || 
                pathName === link.route
                )
                if(link.route === '/profile') link.route = `${link.route}/${userId}`

               return(
                   <Link 
                    href={link.route}
                    key={link.label}
                     className={`leftsidebar_link ${isActive && 'bg-neutral-900'}`}
                    >
                        <Image
                          src={link.imgURL}
                          width={24}
                          height={24}
                          alt='image'
                        />
                        <p className='text-light-1 max-xl:hidden'>
                            {link.label}
                        </p>
                   </Link>
               )
            })}
          </div>

          <div className='mt-6 px-6'>
          <SignedIn>
                 <SignOutButton signOutCallback={() => router.push('/sign-in')}>
                   <div className="flex cursor-pointer gap-4 p-4">

                     <Image 
                      src='/logout.svg'
                      alt="logout"
                      width={24}
                      height={24}
                     />
                     <p className='text-light-2 max-lg:hidden'>Logout</p>
                   </div>
                 </SignOutButton>
               </SignedIn>
          </div>
        </section>
    )
}

export default LeftSidebar;