import mongoose from "mongoose";

export interface FarmInfo {
    fruit: string;
    farmName: string;
    farmerId: mongoose.Types.ObjectId;
    images: string[];
    address: string;
    phoneNumber: string;
    grade: number;
    fruitTypes: mongoose.Types.ObjectId[];
    hashTags: string[];
    introduction: string;
    gridX: number;
    gridY: number;
    weather: string;
    temperature: number;
    humidity: number;
}
