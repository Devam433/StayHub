import mongoose, { Mongoose } from "mongoose";

const staySchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        uinque: true,
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