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
            name: {
                type: String,
                required: true,
            },
            information: {
                type: String,
                required: true,
            },
            color: {
                type: String,
                required: true,
            },
        },
    ],
    introduction: {
        type: String,
        required: true,
    },
});

export default mongoose.model<FarmInfo & mongoose.Document>("Farm", FarmSchema);
