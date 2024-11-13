import express from 'express'
import { connectDB } from './db/config.js'
import { configDotenv } from 'dotenv';
import stayRouter from './routes/stayRoute.js'
configDotenv();

const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json())

app.use('/api/v1/stay',stayRouter)

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
