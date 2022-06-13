import mongoose from "mongoose";

export interface FeedInfo {
    plantId: mongoose.Types.ObjectId;
    farmerId: mongoose.Types.ObjectId;
    images: string[];
    content: string;
}
