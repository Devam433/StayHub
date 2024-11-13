import { StayModel } from "../models/stayModel.js";
import { addStayService } from "../services/stayService.js";

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
    const payload = req.body;
    const response = await addStayService(payload)
    if(response) {
      res.status(201).json(response);
    }
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json(error);
  }
}