import CommunityCard from '@/components/cards/CommunityCard';
import { fetchCommunities } from '@/lib/actions/community.actions';
import { fetchUser, } from '@/lib/actions/user.actions';
import { OrganizationSwitcher, currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation';
import { dark } from '@clerk/themes';


const page = async () => {

    const user = await currentUser();

    if(!user) return null;

    const userInfo = await fetchUser(user.id);

    if(!userInfo?.onboarded) redirect('/onboarding');     

    // Fetch Communityites
    const result = await fetchCommunities({
      searchString: '',
      pageNumber: 1,
      pageSize: 25
    })
 
  return (
    <section>
        <h1 className='head-text mb-10'>Create Communities</h1>
       
       <div className='w-full flex mt-12 border-left  py-6 px-4 justify-between items-start'>
        <OrganizationSwitcher
              appearance={{
                baseTheme: dark,
                elements:{
                  organizationSwitcherTrigger:'py-2 px-4'
                }
              }}
            />
        <div className='flex flex-col gap-5'>
          { result.communities.length === 0 
            ? (
              <p className='no-result'>No Users</p>
            )
            : (
              result.communities.map((community) => (
                <CommunityCard 
                 key={community.id}
                 id={community.id}
                 name={community.name}
                 username={community.username}
                 imgUrl={community.image}
                 bio={community.bio}
                 members={community.members}
                />
              ))
            )
          }
        </div>
      </div>
    </section>
  )
}

export default page