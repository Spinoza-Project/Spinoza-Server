import mongoose from "mongoose";
import { FruitInfo } from "../fruit/FruitInfo";

export interface FarmSpecificResponseDto {
    farmId: mongoose.Types.ObjectId;
    farmName: string;
    address: string;
    phoneNumber: string;
    grade: number;
    tours: Tour[];
    fruitTypes: FruitInfo[] | mongoose.Types.ObjectId[];
    hashTags: string[];
    introduction: string;
    images: string[];
}

interface Tour {
    tourName: string;
    tourImage: string;
    distance: number;
}
