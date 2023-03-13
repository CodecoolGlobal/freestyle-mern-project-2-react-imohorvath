import mongoose from "mongoose";
const { Schema, model } = mongoose;

const favouriteSchema = new Schema({
    name: String,
    country: String,
    comment: String,
    rating: Number,
    createdAt: Date
});

export const Favourite = model('Favourite', favouriteSchema);