import mongoose from "mongoose";


const purchaseCourseSchema = new mongoose.Schema({
    courseId:{
      type:mongoose.Schema.Types.ObjectId,
        ref:'courseModel',
        required:true,  
    },
      userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userModel',
        required:true
      },
      amount:{
        type:Number,
        required:true
      },
      status:{
         type:String,
         enum:['pending','success','failed'],
         default:'pending'
      },
      paymentId:{
        type:String,
        required:true
      }
}, {timestamps:true});
export const coursePurchase = mongoose.model("coursePurchase", purchaseCourseSchema);