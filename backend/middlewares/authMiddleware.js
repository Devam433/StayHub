import  dotenv  from "dotenv";
import jwt from 'jsonwebtoken'
dotenv.config();

const verifyToken = (req, res, next) => {
  let token;
  console.log('In verifyToken middleware');
  console.log(req)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Extract token from header
    token = req.headers.authorization.split(' ')[1];
  }
  console.log('token',token)
  if (!token) {
    return res.status(401).json({ success: false, error: 'Not authorized' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach user ID to the request object
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({ success: false, error: 'Token is not valid' });
  }
};


export default verifyToken