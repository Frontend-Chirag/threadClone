import { Inter } from 'next/font/google';
import '../globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Metadata } from 'next';


export const metaData: Metadata = {
  title:"Threads",
  description:"A Next 13 Meta Threads Application"
 }


const inter = Inter({subsets: ["latin"]})

export default function RootLayout({ children, }:{ children: React.ReactNode }) {
 return(
    <ClerkProvider>
      <html lang='en'>
       <body className={`${inter.className} bg-dark-1`}>
        <div className='w-full flex justify-center items-center min-h-screen'>
         { children }
        </div>
       </body>
      </html>
    </ClerkProvider>
 )
}