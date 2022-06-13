import mongoose from "mongoose";
import { FruitInfo } from "../fruit/FruitInfo";

export interface FarmSpecificResponseDto {
    farmId: mongoose.Types.ObjectId;
    farmName: string;
    address: string;
    phoneNumber: string;
    fruitTypes: FruitInfo[] | mongoose.Types.ObjectId[];
    introduction: string;
    images: string[];
}
