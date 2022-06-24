import mongoose from "mongoose";

export interface FeedResponseDto {
    plantName: string;
    farmName: string;
    farmAdress: string;
    weather: string;
    temperature: number;
    humidity: number;
    feeds: Data[];
}

interface Data {
    feedId: mongoose.Types.ObjectId;
    images: string[];
    content: string;
    createdAt: Date;
}
