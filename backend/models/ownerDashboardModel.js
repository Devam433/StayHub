import mongoose from "mongoose";

const ownerDashboardSchema = new mongoose.Schema({
  ownerId:{
    type: mongoose.Types.ObjectId
  },
  allStays:{
    type: [mongoose.Types.ObjectId]
  },
  currentlyAvailableStays:{
    type: [mongoose.Types.ObjectId]
  },
  currentlyBookedStays:{
    type: [mongoose.Types.ObjectId]
  },
  selectedByQueue:{// Update it to have stayId and it respective selevtedByQueue
    type: [mongoose.Types.ObjectId],
    ref:"Stays"
  }
})

export const ownerDashboardModel = mongoose.model('ownerDashboard',ownerDashboardSchema)