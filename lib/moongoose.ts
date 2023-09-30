import mongoose from 'mongoose';

let isConnected = false; //set Varibale to check if mongoose is connected

export const connectToDB = async () => {
 mongoose.set('strictQuery', true);
  
  if(!process.env.MONGOOSE_URL) return console.log("MONGOOSE_URL not found");
  if(isConnected) return console.log("Already connected to MongoDB");

  try {
    await mongoose.connect(process.env.MONGOOSE_URL);
 
    isConnected = true;
    console.log("connected to MongoDB")

  } catch (error) {
    console.log(error);
  }
}