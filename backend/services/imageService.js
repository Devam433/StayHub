// services/imageService.js  
require('dotenv').config();

const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  // url: process.env.CLOUDINARY_URL,
});

/*
 * Uploads an image to Cloudinary and returns the image URL.
*/
export default uploadImageToCloudinary = async (imageFilesArray) => {
  if(!imageFilesArray) {return null}
  
  try {
    //check if array as we might need to upload multiple files
    if(Array.isArray(imageFilesArray) && imageFilesArray.length !==0 ) { 
      const cloudninary_file_urls = await Promise.all( 
        imageFilesArray.map( async(path) => {
          console.log('uploadImageToCloudinary',path)
          const result = await cloudinary.uploader.upload(path,{
            folder: 'stayhub/user',
            resource_type: 'image',
          })
          return result.secure_url
        })
      );
      return cloudninary_file_urls; //If there are no images it will be undefined
    }
    //else{}
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw new Error('Error submitting files!');
  }
};