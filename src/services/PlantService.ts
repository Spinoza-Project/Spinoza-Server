import { PlantResponseDto } from "../interfaces/plant/PlantResponseDto";
import Plant from "../models/Plant";

const getPlants = async (userId: string): Promise<PlantResponseDto | null> => {
    try {
        const plants = await Plant.find({ userId: userId });

        if (!plants) {
            return null;
        }

        const tmp = await Promise.all(
            plants.map(async (plant: any) => {
                const result = {
                    plantId: plant._id,
                    name: plant.name,
                    image: plant.image,
                };

                return result;
            })
        );

        const data = {
            plants: tmp,
        };

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default {
    getPlants,
};
