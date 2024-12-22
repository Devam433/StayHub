import { setFlagsFromString } from "v8";
import { StayModel } from "../models/stayModel.js";
import { addStayService } from "../services/stayService.js";
import fs from 'fs'


export async function addStay(req,res) { //todo: add auth middleware 
  try {
    const {body,files,user} = req;

    const response = await addStayService(body,files,user)
    console.log('before unlink')

    //delete files from diskstorage
    files.forEach((file) => {
      const filePath = file.path;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error removing ${file}:`, err);
        } else {
          console.log(`${file} removed successfully`);
        }
      });
    });

    if(response) {
      res.status(201).json({message:'Stay created Successfully',response});
    }
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json(error);
  }
}

//TODO: this need to be updated to support the update of images. 
export async function updateStay(req, res) {
  try {
    const dataToUpdate = req.body;

    Object.keys(dataToUpdate).forEach(key=>{
      if(dataToUpdate[key] === "" || null || undefined) {
        throw {message:"Cannot update with empty field. Field cannot be empty",statusCode:400}
      }
    })

    const user = req.user;
    console.log(req.params)
    const {id} = req.params
    console.log(req.body);
    const stayId = id.replace(':', '')
    console.log(stayId)
    //checking if the current user is the user who created the stay
    const stay = await StayModel.findById(stayId);
    if(!stay) {
      res.status(404).json({message:'Stay not found, please ensure id is valid'})
    }
    if(String(user.id) !== String(stay.createdBy)) {
      res.status(403).json({message:'User is not authorized for this operation'})
      return;
    }
    // Define the mapping for flat keys to schema paths
    const fieldMapping = {
      village: "stayDetails.address.village",
      rent: "stayDetails.rent",
      category: "stayDetails.category",
      isBooked: "stayDetails.isBooked",
      landmark: "stayDetails.address.landmark",
      geolocation: "stayDetails.address.geolocation",
      images: "stayDetails.images",
    };
    
    console.log('data to update', dataToUpdate);
    const mappedData = Object.keys(dataToUpdate).reduce((acc,key)=>{
      if(fieldMapping[key]) {
        acc[fieldMapping[key]] = dataToUpdate[key];
      }
      return acc
    },{})
    const response = await StayModel.findByIdAndUpdate(stayId,{$set:mappedData},{new:true});
    if(response){
      res.status(200).json({message:'Update success',response});
    }
  } catch (error) {
    const statusCode = error.statusCode || 500
    res.status(statusCode).json({ success: false, message: error.message });
  }
}

export async function deleteStay(req, res) {
  try {
    const { id } = req.params;
    const response = await StayModel.findByIdAndDelete(id);
    if(response){
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
