import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Page() {
 
    const user = await currentUser();
    console.log(user)

    if(!user) return null;

    const userInfo = await fetchUser(user.id);

    if(!userInfo?.onboarded) redirect('/onboarding');


    return (
     <>
      <h1 className="head-text">Create Thread</h1>
      <PostThread 
       userId={userInfo._id}
       username={userInfo.username}
       imgUrl={userInfo.image}
       />
     </>
)

}

export default Page;