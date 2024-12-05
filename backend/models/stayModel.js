import mongoose, { Mongoose } from "mongoose";

const staySchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Types.ObjectId, //changes it to string for testing purposes
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
    }
});

export const StayModel = mongoose.model("Stay",staySchema);