import mongoose from "mongoose";
import { TourInfo } from "../interfaces/tour/TourInfo";

const TourSchema = new mongoose.Schema({
    tourName: {
        type: String,
        required: true,
    },
    tourImage: {
        type: String,
        required: true,
    },
    distance: {
        type: Number,
        required: true,
    },
});

export default mongoose.model<TourInfo & mongoose.Document>("Tour", TourSchema);
