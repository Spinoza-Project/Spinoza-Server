import mongoose from "mongoose";

export interface FarmResponseDto {
    farms: Data[];
}

interface Data {
    farmId: mongoose.Types.ObjectId;
    farmName: string;
    introduction: string;
    address: string;
    images: string[];
}
