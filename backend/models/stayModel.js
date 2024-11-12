import mongoose, { Mongoose } from "mongoose";

const staySchema = new mongoose.Schema({
    //id of the landlord
    createdBy: {
        type: String,
        uinque: true,
        required: true
    },
    ownerInfo: {
        name: {
            type: String,
            required: true
        },
        contact: {
            phoneNo: {
                type: Number,
            },
            email: {
                type: String,
                lowercase: true
            }
        },
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
                type: Number,
                required: true
            }
        },
        rent: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        isBooked: {
            type: Boolean,
            default: false
        }
    }
});

export const StayModel = mongoose.model("Stay",staySchema);