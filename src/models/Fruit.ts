import mongoose from "mongoose";
import { FruitInfo } from "../interfaces/fruit/FruitInfo";

const FruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    information: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
});

export default mongoose.model<FruitInfo & mongoose.Document>(
    "Fruit",
    FruitSchema
);
