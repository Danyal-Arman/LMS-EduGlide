import mongoose from "mongoose";

const userShcema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["instructor", "student"],
        default: "student"
    },
    enrolledCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        default: [],
        ref:'courseModel' 
    }],
    photo:{
     type:String,
     default:"" 
     
    },
    interests: [{ 
        type: String
    }],
    completedCourses: [{  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courseModel'
    }],
    recommendedCourses: [{  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courseModel'
    }],

},{timestamps:true});

export const userModel = mongoose.model("userModel", userShcema);
 