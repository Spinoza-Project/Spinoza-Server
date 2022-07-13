import mongoose from "mongoose";

export interface FeedFarmerResponseDto {
    userName: string;
    plantName: string;
    plantImage: string;
    farmName: string;
    farmAddress: string;
    temperature: number;
    weather: string;
    humidity: string;
    feeds: Data[];
}

interface Data {
    feedId: mongoose.Types.ObjectId;
    images: string[];
    content: string;
    comments: Comment[];
    createdAt: Date;
}

interface Comment {
    userName: string;
    profileImage: string;
    comment: string;
}
