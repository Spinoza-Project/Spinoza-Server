import mongoose from "mongoose";
import { FruitInfo } from "../fruit/FruitInfo";

export interface FarmInfo {
    farmerId: mongoose.Types.ObjectId;
    images: string[];
    address: string;
    phoneNumber: string;
    fruitTypes: FruitInfo[];
    introduction: string;
}
