import mongoose from "mongoose";

export interface FeedResponseDto {
    feeds: Data[];
}

interface Data {
    feedId: mongoose.Types.ObjectId;
    images: string[];
    content: string;
    createdAt: Date;
}
