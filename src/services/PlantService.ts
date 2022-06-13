import { FeedResponseDto } from "../interfaces/feed/FeedResponseDto";
import { PlantResponseDto } from "../interfaces/plant/PlantResponseDto";
import Feed from "../models/Feed";
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

const getFeedsByPlantId = async (
    plantId: string
): Promise<FeedResponseDto | null> => {
    try {
        const feeds = await Feed.find({ plantId: plantId }).sort({
            createdAt: -1, // 최신순 정렬
        });

        if (!feeds) {
            return null;
        }

        const tmp = await Promise.all(
            feeds.map(async (feed: any) => {
                const result = {
                    feedId: feed._id,
                    images: feed.images,
                    content: feed.content,
                    createdAt: feed.createdAt,
                };

                return result;
            })
        );

        const data = {
            feeds: tmp,
        };

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default {
    getPlants,
    getFeedsByPlantId,
};
