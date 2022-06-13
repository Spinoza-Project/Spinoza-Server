import mongoose from "mongoose";
import { FarmerInfo } from "../interfaces/farmer/FarmerInfo";

const FarmerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

export default mongoose.model<FarmerInfo & mongoose.Document>(
    "Farmer",
    FarmerSchema
);
