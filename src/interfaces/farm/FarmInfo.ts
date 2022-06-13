import mongoose from "mongoose";
import { FruitInfo } from "../fruit/FruitInfo";

export interface FarmInfo {
    fruit: string;
    farmName: string;
    farmerId: mongoose.Types.ObjectId;
    images: string[];
    address: string;
    phoneNumber: string;
    fruitTypes: FruitInfo[];
    introduction: string;
}
