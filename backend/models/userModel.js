import mongoose from "mongoose";
import { ownerDashboardModel } from "./ownerDashboardModel";
import { tenantDashboardModel } from "./tenantDashboardModel";

const usersSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: false,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['Tenant', 'Owner'],
    required: true,
  },
  currentTotalStaysSelected: { 
    //it is the number of stays that is currently selected. Will use this field to check how many stays the user has selected as of now.
    type:Number
  },
  selectedStays:{
    type: [mongoose.Types.ObjectId],
    validate:{
      validator:(v)=>{
        return v.length <=5
      }
    }
  },
  isPremium:{  //TODO: This feature will be added later.
    type: Boolean,
    // validate:{
    //   validator: function(){
    //     return this.role === 'Tenant'
    //   },
    //   message:"Only user with Tetent account could have a Premium account."
    // }
  },
  tenentReviewByOwnerRequired: { 
    type:Boolean,
    // validate:{
    //   validator:function() {
    //     return this.role === "Owner"
    //   },
    //   message:"Only users with Owner account can have this field!"
    // }  
  }
}, { timestamps: true });


usersSchema.methods.isAuthorized = function(allowedRoles) { //method check user role
  return allowedRoles.includes(this.role);
};

usersSchema.pre('save',function (next) {
  if(this.role === 'Tenant' && this.isPremium === undefined) {
    this.isPremium = false
  }

  if(this.role === 'Owner' && this.tenentReviewByOwnerRequired === undefined) {
    this.tenentReviewByOwnerRequired = false
  }
  console.log('this is this',this)
  if(this.tenentReviewByOwnerRequired && this.role === 'Tenant') {
    const error = new Error("Only users with Owner accounts can have this field!");
    error.statusCode = 400; // Set the status code (e.g., 400 for Bad Request)
    console.log('returning next(error)')
    return next(error);
  }

  if(this.isPremium && this.role === 'Owner') {
    return next(new Error('Only users with role as Tenant can have this field'))
  }
  next()
})

usersSchema.post('save',async function(doc,next) { //(doc:the created document,next)
  try {
    if(doc.role === 'Owner') {
      const data = {
        ownerId: new mongoose.Types.ObjectId(doc._id),
        allStays:[],
        currentlyAvailableStays:[],
        currentlyBookedStays:[],
        selectedByQueue:[]
      }
      await ownerDashboardModel.create(data)
    }
    if(doc.role === 'Tenant') {
      const data = {
        tenantId: new mongoose.Types.ObjectId(doc._id),
        currentlyBookedStay:[],
        selectedByQueue:[],
        currentlyShowingInterestStay:[]
      }
      await tenantDashboardModel.create(data)
    }
  } catch (error) {
    console.log(`Error creating the user's dashboard`,error)
  }
  next();
})
export const UsersModel = mongoose.model("Users", usersSchema);
