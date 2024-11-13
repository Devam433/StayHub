//this contains decoupled business logic from the route controllers.

import { StayModel } from "../models/stayModel.js";

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
    typeof args.createdBy !== "string" ||
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

async function createAStay(args) {
  try {
    const response = await StayModel.create(args)
    return response;
  } catch (error) {
    //NOTE: function validateAddStayData(args) already does the type and null validation but we are adding the below check for other validation checks by he DB.
    if(error.name === "ValidationError") {
      const customErrorObject = {message:'Invalid data!',statusCode:400, mongoDbResponse:error} 
      throw customErrorObject;
    }
    throw error;
  }
}

export async function addStayService(args) {
  validateAddStayData(args)
  return await createAStay(args);
}
