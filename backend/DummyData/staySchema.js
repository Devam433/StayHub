// import mongoose from "mongoose";
// import { StayModel } from "../models/stayModel";

// mongoose.connect('mongodb+srv://admin:dKBo5bv7cyR5TaqN@cluster0.37hsc.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0').then((res)=>{
//   console.log('Mongodb connected for DummyData Insert');
// }).catch((err)=>console.log('Error Mongodb connecting for DummyData Insert'))


// const stays = []
// for (let i = 0; i < 15; i++) {
//   const stay = new StayModel({
//     createdBy: "afetycdaew2345tdav",
//     stayDetails: {
//       address: {
//         village: "",
//         landmark: "",
//         geolocation: "",
//       },
//       rent: 0,
//       category: "",
//       isBooked: false,
//       images: [],
//   });
//   stays.push(stay);
// }

// // Save designs to database
// const savedDesigns = await Design.insertMany(stays);
// console.log('Dummy Stays Added')