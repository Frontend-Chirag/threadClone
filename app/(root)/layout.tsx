import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs';
import TopBar from '@/components/shared/TopBar';
import BottomBar from '@/components/shared/BottomBar';
import RightSidebar from '@/components/shared/RightSidebar';
import LeftSidebar from '@/components/shared/LeftSidebar';

const inter = Inter({ subsets: ['latin'] })


export const metaData: Metadata = {
  title:"Threads",
  description:"A Next 13 Meta Threads Application"
 }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={`${inter.className} custom-scrollbar`}>
         <TopBar/>

          <main className='flex flex-row'>
            <LeftSidebar/>
            
             <section className='main-container'>
              <div className='w-full max-w-4xl'>
                {children}
              </div>
             </section>

            <RightSidebar/>
          </main>

         <BottomBar/>
        </body>
    </html>
    </ClerkProvider>
  )
}
