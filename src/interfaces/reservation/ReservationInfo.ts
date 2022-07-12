import mongoose from "mongoose";

export interface ReservationInfo {
    farmerId: mongoose.Types.ObjectId;
    farmId: mongoose.Types.ObjectId;
    plantId?: mongoose.Types.ObjectId;
    fruitType: mongoose.Types.ObjectId;
    price: number;
    reserved: boolean;
}
