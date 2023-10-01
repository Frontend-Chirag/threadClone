import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from '@clerk/nextjs';



async function Page() {
     const user = await currentUser();
     if(!user) return null;

     const userInfo = await fetchUser(user.id);
     


     const userData = {
        id: user?.id,
        objectId: userInfo?.id,
        username: userInfo ? userInfo?.username :  user?.username,
        name: userInfo ?  userInfo?.name: user?.firstName,
        bio: userInfo ?  userInfo?.bio :'',
        image:  userInfo ? userInfo?.image: user?.imageUrl,
     }    

    return (
        <>
         <h1 className='head-text'>Edit Profile</h1>
        <p className='mt-3 text-base-regular text-light-2'>Make any changes</p>
         <section className='mt-12'>
          <AccountProfile user={userData} btnTitle='Continue' />
         </section>
     </>
    )
}

export default Page;
