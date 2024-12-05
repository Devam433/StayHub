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
    const payload = req.body;
    const { id } = req.params;
    const response = await StayModel.updateOne({ $id: id }, payload);
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
    const response = await StayModel.deleteOne({ $id: id });
    if(response){
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
