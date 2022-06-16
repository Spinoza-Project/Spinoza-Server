import mongoose from "mongoose";

export interface PlantResponseDto {
    plants: Data[];
}

interface Data {
    plantId: mongoose.Types.ObjectId;
    image: string;
    name: string;
    weather: string | undefined;
    temperature: number | undefined;
}
