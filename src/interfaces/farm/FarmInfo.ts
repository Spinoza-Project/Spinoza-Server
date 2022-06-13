import mongoose from "mongoose";

export interface FarmInfo {
    fruit: string;
    farmName: string;
    farmerId: mongoose.Types.ObjectId;
    images: string[];
    address: string;
    phoneNumber: string;
    fruitTypes: mongoose.Types.ObjectId[];
    introduction: string;
}
