import mongoose from "mongoose";
import { FruitInfo } from "../interfaces/fruit/FruitInfo";

const FruitSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    information: {
        type: String,
        required: true,
    },
});

export default mongoose.model<FruitInfo & mongoose.Document>(
    "Fruit",
    FruitSchema
);
