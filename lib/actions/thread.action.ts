"use server"

import { revalidatePath } from "next/cache";
import Thread from "../modals/thread.modal";
import User from "../modals/user.model";
import { connectToDB } from "../moongoose";

interface Params {
    text:string,
    author:string,
    communityId: string | null,
    path: string,
}

export async function createThread({text, author, communityId, path}: Params){

    try {
        connectToDB();
        const createdThread = await Thread.create({
          text,
          author,
          community: null,
        });
      
      //   update user model
       await User.findByIdAndUpdate(author,{
          $push: { threads: createdThread._id }
       })
      
       revalidatePath(path)   

    } catch (error: any) {
       throw new Error(`'Error creating Thread ${error.message}`) 
    }
};


export async function fetchPosts(pageNumber = 1, pageSize = 20){
  try {
    connectToDB();
    //  fetch the posts that have no parents (top-level threads...)
    const skipAmount = (pageNumber - 1) * pageSize;
    const postsQuery = Thread.find({ parentId: { $in: [null , undefined]}})
    .sort({createdAt: 'desc'})
    .skip(skipAmount)
    .limit(pageSize)
    .populate({ path: 'author', model: User})
    .populate({
        path: 'children',
        populate: {
            path: 'author',
            model: User,
            select: "_id name parentId image"
        }
    })

    const totalPostCount = await Thread.countDocuments({ parentId: {$in: [ null, undefined ]} })
   
    const posts = await postsQuery.exec();

    const isNext = totalPostCount > skipAmount + posts.length;

    return { posts, isNext };

  } catch (error: any) {
    throw new Error(` Error for fetching Posts ${error.message}`)
  }
}

export async function fetchThreadById(threadId: string) {
  connectToDB();

  try {

    // TODO: Populate Community
     const thread = await Thread.findById(threadId)
     .populate({
      path:'author',
      model:User,
      select:'_id id name image'
     })
     .populate({
      path:'children',
      populate: [
        {
          path:'author',
          model:User,
          select:'_id id name parentId image'
        },
        {
          path:'children',
          model:Thread,
          populate: {
            path:'author',
            model:User,
            select:'_id id name parentId image'
          }
        }
      ]
     }).exec();

     return thread;
  } catch (error: any) {
    throw new Error(`Error fetching thread: ${error.message}`)
  }
}

interface Props {
  threadId: string;
  commentText: string;
  userId: string;
  path: string;
}

export async function addCommentToThread({ threadId, commentText, userId, path }: Props){
  connectToDB();
  try {
    // adding comment funtionality 

    // find original thread by its ID
    const originalThread = await Thread.findById(threadId);

    if(!originalThread){
      throw new Error("Thread not found")
    }

    // create a new Thread with the comment text
    const commentThread = new Thread({
      text: commentText,
      author: userId,
      parentId: threadId,
    });
    
    //save the new Thread
    const savedCommentThread = await commentThread.save();
    
    // update the original thread to include the new comment
    originalThread.children.push(savedCommentThread._id);

    // save the orginal thread
    await originalThread.save();

    revalidatePath(path);

  } catch (error: any ) {
     throw new Error(`Error adding comment to thread: ${error.message}`);    
  }
}