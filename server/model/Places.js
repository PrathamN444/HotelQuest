import mongoose from "mongoose";

const placeSchema = mongoose.Schema({
    owner : {type : mongoose.Schema.Types.ObjectId , ref : "User"},
    title : String,
    address : String,
    photos : [String],
    description : String,
    perks : [String],
    extraInfo : String,
    checkIn : String,
    checkOut : String,
    maxGuests : Number,
    price: Number,
});

export const Place = mongoose.model('Place', placeSchema);