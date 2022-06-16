import mongoose from "mongoose";
import internal from "stream";

export interface FarmInfo {
    fruit: string;
    farmName: string;
    farmerId: mongoose.Types.ObjectId;
    images: string[];
    address: string;
    phoneNumber: string;
    fruitTypes: mongoose.Types.ObjectId[];
    introduction: string;
    gridX: number;
    gridY: number;
}
