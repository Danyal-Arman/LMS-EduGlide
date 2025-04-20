import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config()


cloudinary.config({
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET,
    cloud_name:process.env.CLOUD_NAME
});

// upload media use krenge kyuke hmm photo or video upload krenge to media kuch bhi hosakti h 

//uploading photo,video,audio in cloudinary
export const uploadMedia = async(file)=>{ // when we call uploadMedia then we send file
try {
    const uploadFiles = await cloudinary.uploader.upload(file,{
        resource_type: 'auto'
    });
    return uploadFiles;
} catch (error) {  
    console.error(error)
    // throw error;
}
};

//deleting photo(user ne agar profile change kiya to purana wala cloudinary se delete hoga) ,video,audio from cloudinary

//deletion for photo
export const deletePhotoFromCloudinary = async(public_id)=>{ // cloudinary me jitna bhi media(photo,video, audio) upload hoga uska public_id hoga to uss id se media delete krenge
try {
    const deleteFile = await cloudinary.uploader.destroy(public_id );
    return deleteFile;
} catch (error) { 
    console.error("photo deletion",error)
}
};

//deletion for video
export const deleteVideoFromCloudinary = async(public_id)=>{ 
    try {
      await cloudinary.uploader.destroy(public_id, {resource_type:"video"} );
    } catch (error) {
        console.log(error) 
        console.error("video deletion",error)
    }
};