import mongoose from "mongoose";
import { ReservationInfo } from "../interfaces/reservation/ReservationInfo";

const ReservationSchema = new mongoose.Schema({
    farmerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Farmer",
    },
    farmId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Farm",
    },
    plantId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Plant",
    },
    fruitType: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Fruit",
    },
    price: {
        type: Number,
        required: true,
    },
    reserved: {
        type: Boolean,
        required: true,
    },
});

export default mongoose.model<ReservationInfo & mongoose.Document>(
    "Reservation",
    ReservationSchema
);
