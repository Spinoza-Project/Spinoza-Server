import mongoose from "mongoose";
import { FeedInfo } from "../interfaces/feed/FeedInfo";

const FeedSchema = new mongoose.Schema(
    {
        plantId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Plant",
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
        content: {
            type: String,
            required: true,
        },
        comments: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: "User",
                },
                comment: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<FeedInfo & mongoose.Document>("Feed", FeedSchema);
