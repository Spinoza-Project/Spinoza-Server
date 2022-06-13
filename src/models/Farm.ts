import mongoose from "mongoose";
import { FarmInfo } from "../interfaces/farm/FarmInfo";

const FarmSchema = new mongoose.Schema({
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
            image: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            information: {
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
