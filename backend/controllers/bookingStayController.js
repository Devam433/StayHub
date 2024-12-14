import { StayModel } from "../models/stayModel.js";

//To book a stay
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

    const updatedStay = await StayModel.findByIdAndUpdate(stayId,{$set:{'stayDetails.isBooked':false,currentlyBookedBy:null}})
    console.log('updated unbooked stay',updatedStay)
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({success:false,message:'Error occured at unbookStay',error});
  }
}

//To get all the available stays (using canSelect field to check)
export async function getAvailableStays(req,res) {
  try {
    const availableStays  = await StayModel.find({canSelect:true})
    return res.status(200).json({succcess:true,data:availableStays})
  } catch (error) {
    const statusCode = error.status || 500;
    res.status(statusCode).json({success:false,message:'Unexpected error!',error})
  }
}