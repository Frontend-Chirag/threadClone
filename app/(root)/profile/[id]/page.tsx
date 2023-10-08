
import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadReplies from "@/components/shared/ThreadReplies";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/contants";
import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";

const Page = async ({ params }: {params: { id:string }}) => {

    const user = await currentUser();

    if(!user) return null;

    const userInfo = await fetchUser(params.id);
    const activity = await getActivity(userInfo._id);
   
   

    return(
        <section>
           <h1 className='head-text mb-10'>Profile</h1>
            <ProfileHeader 
             accountId={userInfo.id}
             authUserId={user.id}
             name={userInfo.name}
             username={userInfo.username}
             imgUrl={userInfo.image}
             bio={userInfo.bio}
            />

            <div className="mt-9">
              <Tabs defaultValue="threads" className="w-full">
                 <TabsList className="tab">
                    {profileTabs.map((tab) => (
                        <TabsTrigger key={tab.label} value={tab.value} className="tab2">
                            <Image
                              src={tab.icon}
                              alt={tab.label}
                              width={24}
                              height={24}
                              className="object-contain"
                            />
                            <p className="max-sm:hidden">{tab.label}</p>
                            {tab.label === 'Threads' ? (
                                <p className="ml-1 rounded-sm bg-light-4 
                                px-2 py-2 !text-tiny-medium text-light-2">
                                   {userInfo?.threads?.length}
                                </p>
                              ) : (
                                <p className="ml-1 rounded-sm bg-light-4 
                                px-2 py-2 !text-tiny-medium text-light-2">
                                {activity.length}
                                </p>
                              )
                          
                          }
                        </TabsTrigger>
                    ))}
                 </TabsList>
                
              {userInfo?.threads?.length > 0        
               
               ?   <TabsContent 
                      value='threads'
                      className="w-full text-light-1"
                    >     
                      <ThreadsTab
                        currentUserId={user.id}
                        accountId={userInfo.id}
                        accountType="User"
                      />
                   </TabsContent>           
                
                :  <TabsContent value="threads" className="w-full text-light-1">
                      <h1 className="text-light-1 mt-10 text-base-regular">No Threads</h1>
                   </TabsContent>
               }

               <TabsContent value='replies' className='mt-9'>           
                { activity.map((replies:any) => (
                   <ThreadReplies
                     key={replies.id}
                     id={replies._id}
                     text={replies?.text}
                     name={replies?.author?.name}
                     imgurl={replies?.author?.image}
                     parentId={replies.parentId}
                     />
                     ))}        
               </TabsContent>

                
              </Tabs>
            </div>
        </section>
    )
}

export default Page;