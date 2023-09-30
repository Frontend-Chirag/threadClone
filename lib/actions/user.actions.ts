"use server"

import { revalidatePath } from "next/cache";
import User from "../modals/user.model";
import { connectToDB } from "../moongoose"
import Thread from "../modals/thread.modal";
import { FilterQuery, SortOrder } from "mongoose";


interface Params {
    userId: string;
    username: string;
    name: string;
    image:string;
    bio: string;
    path : string;
}

export async function updateUser({
    userId,
    username,
    name,
    image,
    bio,
    path

}: Params): Promise<void> {
    connectToDB();

    try {
        await User.findOneAndUpdate(
            { id: userId },
            {
                username: username.toLocaleLowerCase(),
                name,
                bio,
                image,
                onboarded:true,
            },
            { upsert: true}
        );
    
        if(path === '/profile/edit') {
           revalidatePath(path)
        }
    } catch (error: any) {
        throw new Error(`Failed to create/update user: ${error.message}`)
    }

}

export async function fetchUser(userId: string){
  try {
   connectToDB();
   return await User
    .findOne({id: userId})
    //   .populate({
    //     path:'communities',
    //     model:Community
    //   })

  } catch (error: any) {
     throw new Error(`Failed to fetch user ${error.message}`) ;  
  }
}

export async function fetchUserPosts(userId: string){
 try {
    connectToDB();
   
    // TODO: Populate community
    // Find all the threads authored by user width the given userId
    const threads = await User.findOne({id: userId})
    .populate({
        path: 'threads',
        model: Thread,
        populate:{
            path: 'children',
            model: Thread,
            populate: {
                path:'author',
                model: User,
                select: 'name image id'
            }
        }
    });
    return threads
 } catch (error: any) {
    throw new Error(`Failed to fetch user Posts : ${error.message} `)
 }
};

interface Props {
    userId: string;
    searchString?: string;
    pageNumber?: number;
    pageSize?: number;
    sortBy?: SortOrder;
}

export async function fetchUsers({ 
    userId , 
    searchString = "",
    pageNumber = 1, 
    pageSize= 20,
    sortBy= 'desc'  
}: Props ) {

    try {
        connectToDB();

        const skipAmmount = (pageNumber - 1 ) * pageSize;
        
        const regex = new RegExp(searchString, "i");

        const query: FilterQuery<typeof User> = {id: { $ne: userId } };
        
        if(searchString.trim() !== ''){
            query.$or = [
                { username: { $regex: regex }},
                { name: { $regex: regex }}
            ]
        }
       
        const sortOptions = { createdAt: sortBy };

        const userQuery = User.find(query)
          .sort(sortOptions)
          .skip(skipAmmount)
          .limit(pageSize)

        const totalUserCount =  await User.countDocuments(query);

        const users = await userQuery.exec();

        const isNext =  totalUserCount > skipAmmount + users.length;

        return { users, isNext}

    } catch (error: any) {
       throw new Error(`Failed to Fetch users ${error.message}`)       
    }
}

export async function getActivity(userId: string){
    try {
        connectToDB();
    
        // find all threads created byt the user
        const userThreads = await Thread.find({ author: userId });

        // collect all the child thread ids (replies) from the 'children' field

        const childThreadIds = userThreads.reduce((acc, userThread) => {
            return acc.concat(userThread.children);
        }, [])

        const replies = await Thread.find({
            _id: { $in: childThreadIds },
            author: { $ne: userId }
        }).populate({
            path: 'author',
            model: User,
            select: 'name image _id username'
        })

        return replies;
    } catch (error: any) {
        throw new Error(`Failed to fetch get Activity ${error.message}`)
    }
}