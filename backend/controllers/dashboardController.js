import { ownerDashboardModel } from "../models/ownerDashboardModel.js";

export async function getOwnerDashboard(req,res,next) {
  try {
    console.log('Inside getOwnerDashboard')
    const response = await ownerDashboardModel.findOne({ownerId:req.user.id}).populate("allStays")
    console.log('getOwnerDashboard repsonse', response)
    if(!response) {
      res.status(404).json({success:false,message:'Not found'})
    }
    return res.status(200).json(response)
  } catch (error) {
    console.log('Error occured at getOwnerDahboard',error);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({success:false,message:error.message || 'Unexpected error!',error})
    // next(error);
    // return;
  }
}