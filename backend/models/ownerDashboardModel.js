import mongoose from "mongoose";

const ownerDashboardSchema = new mongoose.Schema({
  ownerId:{
    type: mongoose.Types.ObjectId,
    ref:"Users"
  },
  allStays:{
    type: [mongoose.Types.ObjectId],
    ref:"Stay"
  },
  currentlyAvailableStays:{
    type: [mongoose.Types.ObjectId],
    ref:"Stay"
  },
  currentlyBookedStays:{
    type: [mongoose.Types.ObjectId],
    ref:"Stay"
  },
  selectedByQueue:{// Update it to have stayId and it respective selevtedByQueue
    type: [mongoose.Types.ObjectId],
    ref:"Stays"
  }
})

export const ownerDashboardModel = mongoose.model('ownerDashboard',ownerDashboardSchema)