import bcrypt from "bcrypt";
import { UsersModel } from "../models/userModel.js";
import jwt from 'jsonwebtoken' 

export async function signUp(req,res,next) {
  console.log(`Hello Kalu`);
  
  const userData = req.body;
  const {userName,password} = req.body;
  // if(!userName || !password) {
  //   return res.status(400).json({message:'All fields are required'})
  // }
  // if(typeof userName!=="string" || typeof password!=="string") {
  //   return res.status(400).json({message:'Invalid type'})
  // }
  
  // try {
    const userFound = await UsersModel.findOne({userName:userName});
    //has scope of improvement against timing attack
    if(userFound) {
      return res.status(409).json({message:'Username not available'}) //conflict
    }
  // } catch (error) {
  //   const customError = new Error('Unexpected Error');
  //   customError.details = error;
  //   next(customError);
  //   return;
  // }

  const hashedPassword = await bcrypt.hash(password,5);
  console.log('type of hashedPassword', typeof hashedPassword)
  userData.password = hashedPassword
  try {
    // const user = await UsersModel.create(userData)
    const model = new UsersModel(userData)
    const user = await model.save()
    if(!user) {
      const error = new Error('Internal Error, Try again')
      error.statusCode = 500;
      next(error);
      return;
    }
    res.status(201).json({
      message:'sign up success!'
    })
  } catch (error) {
    if(error.name === "ValidationError") {
      const customError = new Error("Invalid type")
      customError.statusCode=400
      customError.details = error;
      next(customError);
    }
    else if(error.code === 11000) //Mongoose uses error code 11000 for duplicate key errors. 
    {
      const customError = new Error("Username already exists");
      customError.details = error;
      customError.statusCode=409
      next(customError);
    }
    else {
      next(error);
    }
  }
}

export async function signIn(req,res,next) {
  const {userName,password} = req.body;
  if(!userName || !password) {
    const error = new Error('All fields are required')
    error.statusCode = 400
    next(error)
    return;
  }
  if(typeof userName !="string" || typeof password!= "string") {
    const error = new Error('Invalid type')
    error.statusCode = 400;
    return next(error);
  }

  try {
    const user = await UsersModel.findOne({userName})
    if(!user) {
      const error = new Error('User not found')
      error.statusCode = 404;
      return next(error);
    }
    
    const passwordMatch = await bcrypt.compare(password,user.password);
    if(passwordMatch) {
      const token = jwt.sign({
        id: user._id 
      },process.env.JWT_SECRET,)
      res.status(200).json({
        message:'sign in success',
        user:{
          _id:user._id,
          userName:user.userName,
          phoneNumber:user.phoneNumber,
          role:user.role,
          createdAt:user.createdAt,
          updatedAt:user.updatedAt,
        },
        token: token
      })
    }
    else {
      res.status(400).json({message:'Password did not match!'});
    }
  } catch (error) {
    const customError = new Error('Unexpected Error');
    customError.details = error;
    next(customError);
  }
}
