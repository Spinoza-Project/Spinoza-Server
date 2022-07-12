import mongoose from "mongoose";

export interface FeedInfo {
    plantId: mongoose.Types.ObjectId;
    farmerId: mongoose.Types.ObjectId;
    images: string[];
    content: string;
    comments: Comment[];
}

interface Comment {
    userId: mongoose.Types.ObjectId;
    comment: string;
    isRead: boolean;
}
