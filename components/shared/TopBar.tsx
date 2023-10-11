"use client";


import Image from "next/image";
import Link from "next/link";
import {SignedIn, SignOutButton, OrganizationSwitcher} from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { usePathname, useRouter } from "next/navigation";

const TopBar = () => {
  

  const pathname = usePathname();

  // List of routes where you want to hide the TopBar
  const shouldShowTopBar = pathname.includes('/profile');


    return (
        <nav className={`topbar items-center ${shouldShowTopBar && 'hidden'} `}>
          <Link href='/' className="flex items-center gap-4">
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

          <div className="flex items-center gap-1">
             <div className="block md:hidden">
               <SignedIn>
                 <SignOutButton>
                   <div className="flex cursor-pointer">
                     <Image 
                      src='/logout.svg'
                      alt="logout"
                      width={24}
                      height={24}
                     />
                   </div>
                 </SignOutButton>
               </SignedIn>
             </div>

          </div>
        </nav>
    )
}

export default TopBar;