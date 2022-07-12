import mongoose from "mongoose";

export interface ReservationFarmerResponseDto {
    reservations: Data[];
    fruitTypes: FruitType[];
}

interface Data {
    _id: mongoose.Types.ObjectId;
    plantId?: mongoose.Types.ObjectId;
    userName?: string;
    hasNotification?: boolean;
    color: string;
    reserved: boolean;
}

interface FruitType {
    _id: mongoose.Types.ObjectId | string;
    name: string;
    information: string;
    image: string;
}
