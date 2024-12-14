import mongoose from "mongoose";

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
    default:false,
    validate:{
      validator: function(){
        return this.role === 'Tenent'
      },
      message:"Only user with Tetent account could have a Premium account."
    }
  },
  tenentReviewByOwnerRequired: { 
    type:Boolean,
    default:false,
    validate:{
      validator:function() {
        return this.role === "Owner"
      },
      message:"Only users with Owner account can have this field!"
    }  
  }
}, { timestamps: true });


usersSchema.methods.isAuthorized = function(allowedRoles) { //method check user role
  return allowedRoles.includes(this.role);
};

export const UsersModel = mongoose.model("Users", usersSchema);
