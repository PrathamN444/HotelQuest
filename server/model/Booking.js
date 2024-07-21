import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    place : {type : mongoose.Schema.Types.ObjectId, required: true, ref: "Place"},
    user : {type : mongoose.Schema.Types.ObjectId, required: true},
    checkIn : {type: Date, required: true},
    checkOut: {type: Date, required: true},
    phoneNo : {type: String, required: true},
    name : {type: String, required: true},
    numberOfGuests : {type: Number, required: true},
    totalPrice : {type: Number, required: true},
})

export const Booking = mongoose.model("Booking", BookingSchema);