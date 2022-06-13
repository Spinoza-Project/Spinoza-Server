import mongoose from "mongoose";

export interface PlantInfo {
    userId: mongoose.Types.ObjectId;
    farmId: mongoose.Types.ObjectId;
    farmerId: mongoose.Types.ObjectId;
    name: string;
    image: string;
}
