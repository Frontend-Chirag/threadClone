import UserCard from "@/components/cards/UserCard";
import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { communityTabs } from "@/contants";
import { fetchCommunityDetails } from "@/lib/actions/community.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";



const Page = async ({ params }: {params: { id:string }}) => {

    const user = await currentUser();

    if(!user) return null;

    const communityDetail = await fetchCommunityDetails(params.id)

    return(
        <section>
            <ProfileHeader 
             accountId={communityDetail.id}
             authUserId={communityDetail.id}
             name={communityDetail.name}
             username={communityDetail.username}
             imgUrl={communityDetail.image}
             bio={communityDetail.bio}
             type="Community"
            />

            <div className="mt-9">
              <Tabs defaultValue="threads" className="w-full">
                 <TabsList className="tab">
                    {communityTabs.map((tab) => (
                        <TabsTrigger key={tab.label} value={tab.value} className="tab">
                            <Image
                              src={tab.icon}
                              alt={tab.label}
                              width={24}
                              height={24}
                              className="object-contain"
                            />
                            <p className="max-sm:hidden">{tab.label}</p>
                            {tab.label === 'Threads' && (
                                <p className="ml-1 rounded-sm bg-light-4 px-2 py-2 !text-tiny-medium text-light-2">
                                   {communityDetail?.threads?.length}
                                </p>
                            )}
                        </TabsTrigger>
                    ))}
                 </TabsList>
    
                    <TabsContent  
                      value={"threads"}
                      className="w-full text-light-1"
                    >
                       <ThreadsTab
                         currentUserId={user.id}
                         accountId={communityDetail._id}
                         accountType="Community"
                       />
                    </TabsContent>


                    <TabsContent  
                      value={"members"}
                      className="w-full text-light-1"
                    >
                      <section className="flex flex-col mt-9 gap-10">
                         {communityDetail?.members.map((member: any) => (
                            <UserCard 
                             key={member.id}
                             id={member.id}
                             name={member.name}
                             username={member.username}
                             imgUrl={member.image}
                             personType="User"
                            />
                         ))}
                      </section>
                    </TabsContent>


                    <TabsContent  
                      value={"requests"}
                      className="w-full text-light-1"
                    >
                       <ThreadsTab
                         currentUserId={user.id}
                         accountId={communityDetail._id}
                         accountType="Community"
                       />
                    </TabsContent>
              </Tabs>
            </div>
        </section>
    )
}

export default Page;