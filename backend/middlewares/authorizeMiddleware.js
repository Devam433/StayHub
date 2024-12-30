import {UsersModel}  from "../models/userModel.js";

export default function authorizeMiddleware(role) {
  console.log('authorizeMiddleware This is the role ->',role)
  console.log('authorizeMiddleware This is the role ->',role)
  return async (req,res,next) => {
      try {
        if(!req.user) {
          return res.status(401).send('Please authenticate');
        }
        const currentUser = await UsersModel.findById(req.user.id);
        if(!currentUser.isAuthorized(role)) {
          const error = new Error('User is Unauthorized, Forbidden access'); 
          error.statusCode = 403;
          return res.status(403).json({message:'User is Unauthorized, Forbidden access!'});
        }
        next()
      } catch (error) {
        return res.status(500).json({message:'Unexpected Error!',error});
      }
  }
}