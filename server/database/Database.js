import mongoose from "mongoose";

const ConnectDB = async()=>{
try{
 await mongoose.connect(process.env.MONGO_URI);
 console.log("Connected to MongoDB successfully")
}
catch(error){
   console.error(error)
   throw error;
}
}
export default ConnectDB; 

// getaddrinfo ENOTFOUND cluster0-shard-00-00.qvb9q.mongodb.net ?