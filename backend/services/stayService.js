//this contains decoupled business logic from the route controllers.

import mongoose from "mongoose";

import { StayModel } from "../models/stayModel.js";
import uploadImageToCloudinary from  "../services/imageService.js"
import modifyDataStructure from "../utils/modifyDataStructure.js";

function validateAddStayData(args) {
  if (
    args.createdBy == null || 
    args.stayDetails.address.village == null || 
    args.stayDetails.address.landmark == null || 
    args.stayDetails.address.geolocation == null || 
    args.stayDetails.rent == null || 
    args.stayDetails.category == null || 
    args.stayDetails.isBooked == null
  ) {
    throw { message: 'All fields are required!',statusCode: 400 };
  }
  if(
    mongoose.Types.ObjectId.isValid(args.createdBy) ||
    typeof args.stayDetails.address.village !== "string" ||
    typeof args.stayDetails.address.landmark !== "string" ||
    typeof args.stayDetails.address.geolocation !== "number" ||
    typeof args.stayDetails.rent !== "number" ||
    typeof args.stayDetails.isBooked !== "boolean" ||
    typeof args.stayDetails.category !== "string"
  ) {
    throw { message: 'Invalid type', statusCode:400 };
  }
}

async function createAStay(data) {
  try {
    console.log('Inside createAStay',data)
    const response = await StayModel.create(data)
    return response;
  } catch (error) {
    console.log('error in createAStay')
    //NOTE: function validateAddStayData(args) already does the type and null validation but we are adding the below check for other validation checks by he DB.
    if(error.name === "ValidationError") {
      const customErrorObject = {message:'Invalid data!',statusCode:400, mongoDbResponse:error} 
      throw customErrorObject;
    }
    throw error;
  }
}

export async function addStayService(body,files,user) {

  console.log('This is files',files)

  //upload image files to cloudinary
  const imageFilesArray = [] //[{<key>:'<filePath>'},...]
  if(files) {                             //populates imageFilesArray (array of objects)
    files.forEach((file)=>{
      console.log('this is file',file)
      console.log('this is files',files)
      console.log('this is path of the file in files',file.path)
        imageFilesArray.push(file.path)
    })
  }
  console.log('this is imageFilesArray:',imageFilesArray)
  const cloudinary_upoloaded_file_links = await uploadImageToCloudinary(imageFilesArray)
  console.log('cloudinary_upoloaded_file_links',cloudinary_upoloaded_file_links)

  // validateAddStayData(body)

  const structure = {
    createdBy: "",
    stayDetails: {
      address: {
        village: "",
        landmark: "",
        geolocation: "",
      },
      rent: 0,
      category: "",
      isBooked: false,
      images: [],
    },
  };
  console.log('We are here',user)
  const modifiedData = modifyDataStructure({...body,createdBy:user.id, images:cloudinary_upoloaded_file_links},structure)
  console.log('We are here 2')
  return await createAStay(modifiedData);
}
