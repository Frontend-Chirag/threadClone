"use client";

import { sidebarLinks } from "@/contants";
import { useRouter, usePathname } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";

function BottomBar() {
    const router = useRouter();
    const pathName = usePathname();

    return(
        <section className="bottombar  bg-zinc-800">
          <div className="bottombar_container">
          {sidebarLinks.map((link) => {
               const isActive = (
                pathName.includes(link.route) && 
                link.route.length > 1 || 
                pathName === link.route
                )
               return(
                   <Link 
                    href={link.route}
                    key={link.label}
                     className={`bottombar_link ${isActive && 'bg-primary-500'}`}
                    >
                        <Image
                          src={link.imgURL}
                          width={24}
                          height={24}
                          alt='image'
                        />
                        <p className='text-subtle-medium text-light-1 max-sm:hidden'>
                            {link.label.split(/\s+/)[0]}
                        </p>
                   </Link>
               )
            })}
          </div>
        </section>
    )
}

export default BottomBar;