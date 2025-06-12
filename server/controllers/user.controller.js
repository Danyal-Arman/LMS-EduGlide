import { userModel } from "../models/user.model.js"
import bcrypt from 'bcrypt'

import { generateToken } from '../utils/generateToken.js'
import { deletePhotoFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const normalizedEmail = email?.toLowerCase();


        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please fill in all fields'
            });
        }

        let user = await userModel.findOne({ email: normalizedEmail });
        if (user) {
            return res.status(400).send({ message: "you already have an account" })
        };
        const hashedPassword = await bcrypt.hash(password, 10);
  
        const newUser = new userModel({
            username,
            email: normalizedEmail,
            password: hashedPassword
        });
        let token = generateToken(newUser);
        await newUser.save(); // is placed before sending the final response (res.status(201).json(...)) to ensure that the user is successfully saved to the database before sending a response.

        return res.status(201).cookie("token", token, {
            httpOnly: true, sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000
        }).json({
            success: true,
            message: "Account Created succesfully"
        });  

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error during registration'
        })  
    }
};
       


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please fill in all fields',
            })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "wrong email or password",
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {

            return res.status(400).json({
                success: false,
                message: "Wrong email or password!"
            })
        }
        else {
            let token = generateToken(user);
            res.status(200).cookie("token", token, { httpOnly: true, sameSite: "Strict", maxAge: 24 * 60 * 60 * 1000 }).json({
                success: true,
                message: `Welcome back ${user.username}`
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to login'
        })
    }
}; 



export const logoutUser = async (req, res) => {
    try {
       return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            success: true,
            message: "logout successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to logout'
        })
    }
};



export const userProfile = async(req, res) =>{
try {
    const userId = req.body.id;
    const user = await userModel.findById(userId).select("-password").populate({
        path: "enrolledCourses",  
        populate: {
            path: "creator",  
            select: "username photo " 
        }
    });
    if(!user){
        return res.status(404).json({
            success: false,
            message: "User not found"
        }) 

    }
    const actually  = await userModel.findOne({ _id: userId }, { enrolledCourses: 1 })

    return res.status(200).json({
        success:true,
        user,
    });
 
     
} catch (error) {
    return res.status(500).json({
        success: false, 
        message: 'Failed to get user profile'
    })
}
}
 
export const  updateProfile = async(req,res)=>{
    try {   

        const userId = req.body.id
        const {username, role} = req.body
        const profilePhoto = req.file;
 
        const user =await userModel.findById(userId)
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        // so we need to upload photo on cloudinary then the photoUrl get existed 
        //Extracting public id of old image from the database photo, if it existed
       if(!profilePhoto){

           if(user.photo){
             const publicId = user.photo.split('/').pop().split(".")[0]; // extract public id
             deletePhotoFromCloudinary(publicId) //deletion from cloudinary not from database
           } 
       }
        
       
        //upload new photo
        const cloudRes = await uploadMedia(profilePhoto?.path)
        const photo = cloudRes?.secure_url
    
      
        const UpdatePfp = {username, photo, role}
     
        const updatedUserPfp = await userModel.findByIdAndUpdate(userId,UpdatePfp  , {new: true} ).select("-password") //{new: true} taake saari chize updated dikhe
        return res.status(200).json({
            success:true,
            user:updatedUserPfp,
            message:"profile updated successfully"
        });
    }
     catch (error) {
        return res.status(500).json({
            success:false,
            message: 'Failed to update profile'
        })
    }

}
 