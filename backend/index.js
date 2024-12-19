import express from 'express'
import { connectDB } from './db/config.js'
import { configDotenv } from 'dotenv';
import stayRouter from './routes/stayRoute.js'
import authRouter from './routes/authRouter.js'
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js'
import bookStayRouter from './routes/bookingRouter.js'
configDotenv();

const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json())

app.use('/api/v1/stay',stayRouter) //done -> route for owner to create stay
app.use('/api/v1/users',authRouter) //done -> auth route
app.use('/api/v1/book',bookStayRouter) // onprogress -> for tenant perform book operations
//todo-> /getOwnerDashboard/:id -> total no. of stays, booked by tenant no.

app.use(errorHandlerMiddleware)

app.get('/api/public',(req,res)=>{
  res.send('This is public')
})

async function start() {
  try {
    await connectDB();
    console.log('db connected')
    app.listen(PORT,()=>{
      console.log(`server running on port ${PORT}`)
    })
  } catch (error) {
    console.log('error',error);
  }
}

start();
