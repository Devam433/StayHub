import mongoose from "mongoose";
import { StayModel } from "../models/stayModel.js";

//To book a stay
//TODO: Update it so that stay cannot be directly booked if Owner of the stay has reviewTenant set to true
export async function bookStay(req,res) {
  //id of the stay, id of the user
  try {
    console.log('We are here in bookStay controller')
    const {id} = req.params;
    console.log('id->',id)
    const stayId = id.replace(':','');
    console.log('stayId',stayId);
    const user = req.user;
    console.log('user ->',user);
    const stayToBook = await StayModel.findById(stayId);
    console.log('stayToBook',stayToBook)

    //check if stayToBook exists
    if(!stayToBook) {
     return res.statusCode(404).json({success:false,message:"Stay to book not found. Please ensure id is valid. "})
    }
    console.log(stayToBook.canSelect)
    //if stayToBook exists then check whether it is available to book on not
    if(!stayToBook.canSelect) {
      return res.status(403).json({success:false,message:'Stay cannot be booked'})
    }
    // Additional fallback validation( If the schema middlware fails somehow.)
    console.log(stayToBook.canSelect)
    if (
      stayToBook.selectedByQueue.length >= stayToBook.maxSelections ||
      stayToBook.stayDetails.isBooked === true
    ) {
      console.log("stayToBook.selectedByQueue.length",stayToBook.selectedByQueue.length)
      console.log("stayToBook.maxSelections",stayToBook.maxSelections)
      console.log('stayToBook.selectedByQueue.length >= stayToBook.maxSelections',stayToBook.selectedByQueue.length >= stayToBook.maxSelections)
      return res.status(400).json({ success: false, message: "Stay cannot be booked" });
    }

    console.log('after !stayToBook.selectedByQueue.length >= stayToBook.maxSelections')

      //TODO: Add payment gateway. Update should only be made when a successful payment has been made.
      const response = await StayModel.findByIdAndUpdate(
        stayId,
        {$set: {"stayDetails.isBooked":true, "currentlyBookedBy":user.id}},
        {runValidators:true,new: true}
      )
      console.log(response);

      return res.status(201).json({success:true,message:'Stay Booked',response})

  } catch (error) {
    const statusCode = error.status || 500;
    res.status(statusCode).json({success:false,message:'Unexpected error!',error})
  }
}

//To Unbook a stay
export async function unbookStay(req,res) {
  try {
    const { id } = req.params;
    const stayId = id.replace(':','');
    const stayToUnbook = await StayModel.findById(stayId)
    if(!stayToUnbook) {
      res.status(404).json({success:false,message:'Stay not found. Ensure that id is valid!'})
    }

    const response = await StayModel.findByIdAndUpdate(stayId,{$set:{'stayDetails.isBooked':false,currentlyBookedBy:null}})
    console.log('updated unbooked stay',updatedStay)
    return res.status(200).json({success:true,message:'Stay Unbooked',response})
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({success:false,message:'Error occured at unbookStay',error});
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

//To show-interest in the stay.Also This is only possible when the owner has reviewTenant set to true and selectedByQueue is not full (ie., 3)
export async function showInterestInStay(req,res) {
  try {
    const {id} = req.params;
    const stayId = id.replace(':','');
    const user = req.user;
    
    const stay = await StayModel.findById(stayId);
    if(!stay) {
     return res.status(404).json({success:false,message:'Stay not found. Please ensure id is correct!'});
    }



    if(!stay.canSelect) {
      if(stay.currentlyBookedBy && stay.currentlyBookedBy.equals(user.id)) {
        return res.status(400).json({success:false,message:'Stay is currently booked by you!'});
      } 
      else if(stay.selectedByQueue.length !==0) {
        if(stay.selectedByQueue.some(id => id.equals(user.id))) {
          return res.status(400).json({success:false,message:'You are already in the queue'});
        }
      }
     return res.status(400).json({success:false,message:'Stay already booked or has reached maxSelection'});
    }

    if(stay.selectedByQueue && stay.selectedByQueue.some(id => id.equals(user.id))) {
      return res.status(400).json({success:false,message:'You are already in the queue'})
    }

    const ObjectTypeUserId = new mongoose.Types.ObjectId(user.id);
    const response = await StayModel.findByIdAndUpdate(stayId,{$push:{'selectedByQueue':ObjectTypeUserId}},{new: true});
    console.log('UpdatedStay with push selectedByQueue',response);
    return res.status(200).json({success:true,message:'Successfully got to queue',stay:response})
  } catch (error) {
    console.log('Error in showInterestInStay',error);
    const statusCode = error.status || 500; 
    res.status(statusCode).json({success:false,message:error.message || "Error showing Interest in the stay!"})
  }
}

//to remove-interest in the stay. 
export async function removeInterestInStay(req,res) {
  try {
    const {id} = req.params;
    const stayId = id.replace(':','');
    const user = req.user;
    
    const stay = await StayModel.findById(stayId);
    if(!stay) {
     return res.status(404).json({success:false,message:'Stay not found. Please ensure id is correct!'});
    }


    if(stay.selectedByQueue && stay.selectedByQueue.some(id => id.equals(user.id))) {
      const response = await StayModel.findByIdAndUpdate(stayId,{$pull:{'selectedByQueue':id}},{new:true});
      console.log('removed interest from stay',response);
    }

    return res.status(200).json({success:true,message:'Successfully got to queue',stay:response})
  } catch (error) {
    console.log('Error in removeInterestInStay',error);
    const statusCode = error.status || 500; 
    res.status(statusCode).json({success:false,message:error.message || "Error removing Interest in the stay!"})
  }
}