import mongoose from "mongoose";
import { FarmInfo } from "../interfaces/farm/FarmInfo";

const FarmSchema = new mongoose.Schema({
    fruit: {
        type: String,
        required: true,
    },
    farmName: {
        type: String,
        required: true,
    },
    farmerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Farmer",
    },
    images: [
        {
            type: String,
            required: true,
        },
    ],
    address: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    fruitTypes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Fruit",
        },
    ],
    introduction: {
        type: String,
        required: true,
    },
    gridX: {
        type: Number,
        required: true,
    },
    gridY: {
        type: Number,
        required: true,
    },
});

export default mongoose.model<FarmInfo & mongoose.Document>("Farm", FarmSchema);
