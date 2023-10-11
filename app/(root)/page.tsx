


import ThreadCard from "@/components/cards/ThreadCard";
import DeleteThread from "@/components/forms/DeleteThread";
import { fetchPosts } from "@/lib/actions/thread.action";
import { currentUser } from "@clerk/nextjs";
 
export default async function Home() {
  
  const result = await fetchPosts(1, 30);

  const user = await currentUser();

  

  return (
    <>
     {/* <h1 className="head-text text-left">
      Home
     </h1> */}
     <section className='mt-9 flex flex-col gap-10'>
       {
        result.posts.length === 0 ? (
          <p className="no-result">No Threads found</p>
        ) : 
        <>
          {result.posts.map((post) => (
            <div className=" relative overflow-hidden" key={post._id}>
              <DeleteThread
                threadId={JSON.stringify(post._id)}
                currentUserId={user?.id || ""}
                authorId={post.author.id}
                parentId={post.parentId}
              />
            <ThreadCard
             key={post._id}
             id={post._id}
             currentUserId={user?.id || ""}
             parentId={post.parentId}
             content={post.text}
             author={post.author}
             createdAt={post.createdAt}
             community={post.community}
             comments={post.children}
             image={post.image}
             likes={post.likes}
             />
             </div>
          ))}
        </>
       }
     </section>
    </>
  )
}