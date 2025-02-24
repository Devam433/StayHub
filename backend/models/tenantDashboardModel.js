import mongoose from "mongoose";

const tenantDashboardSchema = new mongoose.Schema({
  tenantId:{
    type: mongoose.Types.ObjectId
  },
  currentlyBookedStay:{
    type: [mongoose.Types.ObjectId]
  },
  currentlyShowingInterestStay:{
    type:[mongoose.Types.ObjectId]
  }
  //if tenant has a currentlyShowingInterestStay and the owner of that stay accepts the tenant then the stayId should go to currentlyBookedStay
})

export const tenantDashboardModel = mongoose.model('tenantDashboard',tenantDashboardSchema);