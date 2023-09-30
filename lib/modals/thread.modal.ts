import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
   text: {type: String, required: true },
   author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
   },
   community: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Community',
   },
   createdAt:{
    type: Date,
    default: Date.now,
   },
   parentId: {
    type: String,
   },
   children: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thread'
    }
   ]

});

const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema)

export default Thread;

// Thread Original  parent for comment 1 or 2 
//   -> Thread Comment1
//   -> Thread Comment2 parent for comment 3 
//       -> Thread Comment3

// by which anybody ables to comment on Someone Else comments 

