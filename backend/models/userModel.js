import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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
  }
}, { timestamps: true });


usersSchema.methods.isAuthorized = function(allowedRoles) { //method check user role
  return allowedRoles.includes(this.role);
};

export const UsersModel = mongoose.model("Users", usersSchema);
