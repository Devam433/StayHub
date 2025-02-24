import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();
const connection_string = process.env.connection_string

export const connectDB = () => {
  return mongoose.connect(connection_string,{//the default(s) are depricated
  })
}