export function errorHandler(err,req,res,next) {
  const statusCode = err.statusCode === 200 ? 500 : err.statusCode;  
  res.status(statusCode); // setting the status code for the response
  switch(statusCode){
    case 400: //bad request
      res.json({
        message:err.message,
        errorDetails:err.details||null,
        stack:process.env.NODE_ENV === 'production' ? null : err.stack
      })
      break;
    case 401: //unauthorized
      res.json({
        message:err.message,
        errorDetails:err.details||null,
        stack:process.env.NODE_ENV === 'production' ? null : err.stack
      })
      break;
    case 403: //forbidden
      res.json({
        message:err.message,
        errorDetails:err.details||null,
        stack:process.env.NODE_ENV === 'production' ? null : err.stack
      })
      break;
    case 404: //not found
    console.log('404 error handler',err)
      res.json({
        message:err.message,
        errorDetails:err.details||null,
        stack:process.env.NODE_ENV === 'production' ? null : err.stack
      })
      break;
    case 409: //db conflict
    console.log('email error')
      res.json({
        message:err.message,
        errorDetails:err.details||null,
        stack:process.env.NODE_ENV === 'production' ? null : err.stack
      })
      break;
    case 500: //internal server error
      res.json({
        message:err.message,
        stack:process.env.NODE_ENV === 'production' ? null : err.stack
      })
      break;
    default:
      res.json({
        message:err.message,
        errorDetails:err.details||null,
        stack:process.env.NODE_ENV === 'production' ? null : err.stack
      })
  }
}