import mongoose from "mongoose";
import { PlantInfo } from "../interfaces/plant/PlantInfo";

const PlantSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    farmId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Farm",
    },
    farmerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Farmer",
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});

export default mongoose.model<PlantInfo & mongoose.Document>(
    "Plant",
    PlantSchema
);
