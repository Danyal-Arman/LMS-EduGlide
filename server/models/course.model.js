import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  courseTitle:{
    type:String,
    required:true,
  },
  subTitle:{
    type:String,
  },
  description:{
    type:String,
  },
  category:{
    type:String,
    required:true,
  },
  courseLevel:{
    type:String,
    enum:["Beginner", "Intermediate", "Advance"], // Only these values are allowed to be saved in the database, other than this will rejected
  },
  coursePrice:{
    type:Number,
  },  
  courseThumbnail:{
    type:String,
  },  
  enrolledStudents:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'userModel'
  }],
  lectures:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'lectureModel'
  }],
  creator:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'userModel',
    required:true
  },
  isPublished:{
    type:Boolean,
    default:false,
  },
  courseRating:[{
    user:{type:mongoose.Schema.Types.ObjectId, ref:'userModel'},
    course:{ type:mongoose.Schema.Types.ObjectId, ref:'courseModel'},
    rating:{type:Number, min:1 , max:5, required:true},
    review:String,
    createdAt:{type:Date, default:Date.now}
  }],  

},{timestamps:true}); 
export const courseModel = mongoose.model("courseModel", courseSchema);