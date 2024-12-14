import mongoose, { Mongoose } from "mongoose";
import { UsersModel } from "./userModel.js";

const staySchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Types.ObjectId, //changes it to string for testing purposes
        ref: "Users",
        required: true
    },
    stayDetails: {
        address: {
            village: {
                type: String,
                required: true
            },
            landmark: {
                type: String,
                required: true
            },
            geolocation: {
                type: String,
                required: true
            }
        },
        rent: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        isBooked: {
            type: Boolean,
            default: false
        },
        images: {
            type: [String], // Array of strings to store image URLs
            validate: {
                validator: function (v) {
                    // Check that the array has at most 5 elements
                    return v.length <= 5;
                },
                message: props => `You can upload a maximum of 5 images. Currently, you have uploaded ${props.value.length}.`
            },
             // Default to an empty array if no images are provided
        },
        createdAt: {type:Date,default:Date.now()}
    },
    maxSelections: { type: Number, default: 1, //this field is only for Owner with tenentReviewByOwnerRequired as true
        validate: {
            validator:async function (v) {
                const ownerId = this.createdBy; //id of the owner of this document
                console.log("ownerId",ownerId)
                const stayModel = this.constructor;
                console.log("stayModel",stayModel)
                const Owner = await UsersModel.findById(ownerId)
                console.log('validator Owner',Owner);
                if(Owner.tenentReviewByOwnerRequired) { //if tenentReviewByOwnerRequired is true, then the maxSelections is upto 3
                    return v <= 3;
                }
                return v.length === 1; // if tenentReviewByOwnerRequired is false then the maxSelections is only 1
            },
            // message: `Can not be selected by more than 3 users!`
        },
     }, // Maximum number of users who can select this design. Can be updated by owner up to 3
    selectedByQueue: {
        type:[ //this array of objs are the userIds of the users who are showing interest in renting(This field is only used when the tenentReviewByOwnerRequired is true)
            {
                userId: { type: mongoose.Types.ObjectId},
            },
        ],
        default:[],
        validate: {
            validator: function (v) {
                // Check that the array's total elements is equal to of maxSeection
                return v.length <= this.maxSelections;
            },
            message: `Can not be selected by more than maxSelections, you have uploaded. Max selection has been reached!`
        },
    },
    currentlyBookedBy: {
        type: mongoose.Types.ObjectId,
        default:null
    },
    canSelect:{type: Boolean, default: true}, //This is to check(after the FE send request to bookStay) if user can show interest in booking the stay. If its true that means that the selectedByQueue length has not yet reached to maxSelections and also isBooked is false. So basically is a a single allrounder field that can be checked to know if the stay is available to book ot availabe to insert interested user in the selectedByQueue when maxSelection is not 1.

    bookingDuration:{ //Not working on this as of now. Will 
        type:String,
    }
});

// Middleware to automatically update `canSelect` based on `selectedByQueue` length,maxSelections,isBooked
staySchema.pre("findOneAndUpdate",async function (next){
    console.log('In pre("findOneAndUpdate')

    const update = this.getUpdate(); //gets the update object
    console.log('Before this.getQuery')
    const query = this.getQuery(); //gets the query condition (ie.{_id:id})
    console.log('After getQuery',query)
    console.log(update)
    if(update.$push?.selectedByQueue) { // this is only when 
        const stay = await this.model.findOne(query);
        if(stay.selectedByQueue.length + 1 >= stay.maxSelections) { //this means that selectedBy length is equal to maxSelections so canSelect should also be false
            update.canSelect = false;
            this.setUpdate(update);
        }
        else {
            update.canSelect = true;
            this.setUpdate(update);
        }
    }

    if(update?.['$set']?.['stayDetails.isBooked'] === true) { //if we want to update isBooked as true
        console.log('We inside update?.[$set] ')
        const stay = await this.model.findOne(query);
        console.log('This is stay',stay)
        if(stay.stayDetails.isBooked === false ) { //check if the stay we want to update has isBooked set to true or not
            update.$set.canSelect = false;
            // update.selectedByQueue = [] //make it work
        console.log('Update after update.$set.canSelect = false',update)

            this.setUpdate(update);
        }
    }
    else {
        const stay = await this.model.findOne(query);
        if(stay.stayDetails.address.isBooked !== false && stay.currentlyBookedBy !== null) { //check if the stay we want to update has isBooked set to false or not
            update.canSelect = true;
            this.setUpdate(update);
        }
    }
    next();
})

export const StayModel = mongoose.model("Stay",staySchema);