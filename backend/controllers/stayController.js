import { setFlagsFromString } from "v8";
import { StayModel } from "../models/stayModel.js";
import { addStayService } from "../services/stayService.js";
import fs from 'fs'
export async function getAllStays(req,res) {
  try {
    const response = await StayModel.find({});
    if(response){
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

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

export async function updateStay(req, res) {
  try {
    const data = req.body;
    const user = req.user;
    const id = req.params.replace(":","")
    
    //checking if the current user is the user who created the stay
    const stay = await StayModel.findById(id);
    if(!stay) {
      res.status(404).json({message:'Stay not found, please ensure id is valid'})
    }
    if(String(user.id) !== String(stay.createdBy)) {
      res.status(403).json({message:'User is not authorized for this operation'})
    }

    //TODO: this need to be updated to support the update of images. 

    const response = await StayModel.findByIdAndUpdate(id,{$set:data},{new:true});
    if(response){
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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
