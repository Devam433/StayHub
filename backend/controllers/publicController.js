import { StayModel } from '../models/stayModel.js'

export async function getAllStays(req,res) {
  try {
    const response = await StayModel.find();
    if(response){
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

//To get all the available stays (using canSelect field to check)
export async function getAvailableStays(req,res) {
  try {
    const availableStays  = await StayModel.find({canSelect:true})
    return res.status(200).json({succcess:true,availableStays})
  } catch (error) {
    const statusCode = error.status || 500;
    res.status(statusCode).json({success:false,message:'Unexpected error!',error})
  }
}