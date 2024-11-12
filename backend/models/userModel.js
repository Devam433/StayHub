import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  name:{
    type:String,
    required: true,
    unique:false,
    lowercase:true
  },
  email:{
    type:String,
    required: true,
    unique: true,
    lowercase:true
  },
  password:{
    type:String,
    required:true,
  }
},{timestamps:true})

export const UsersModel = mongoose.model("Users",usersSchema)