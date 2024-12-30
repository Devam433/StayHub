import { ownerDashboardModel } from "../models/ownerDashboardModel.js";
import { tenantDashboardModel } from "../models/tenantDashboardModel.js";

export async function getOwnerDashboard(req,res,next) {
  try {
    const response = await ownerDashboardModel.findOne({ownerId:req.user.id}).populate("allStays")
    if(!response) {
      res.status(404).json({success:false,message:'Not found'})
    }
    return res.status(200).json(response)
  } catch (error) {
    console.log('Error occured at getOwnerDahboard',error);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({success:false,message:error.message || 'Unexpected error!',error})
  }
}

export async function getTenantDashboard(req,res) {
  try {
    const response = await tenantDashboardModel.findOne({tenantId:req.user.id})
    if(!response) {
      res.status(404).json({success:false,message:'Not found'})
    }
    return res.status(200).json(response)
  } catch (error) {
    console.log('Error occured at getOwnerDahboard',error);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({success:false,message:error.message || 'Unexpected error!',error})
  }
}