import mongoose from "mongoose";
import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { FeedResponseDto } from "../interfaces/feed/FeedResponseDto";
import { PlantCreateDto } from "../interfaces/plant/PlantCreateDto";
import { PlantResponseDto } from "../interfaces/plant/PlantResponseDto";
import Farm from "../models/Farm";
import Feed from "../models/Feed";
import Plant from "../models/Plant";

const createPlant = async (
    userId: string,
    plantCreateDto: PlantCreateDto
): Promise<PostBaseResponseDto | null> => {
    try {
        const farmId = plantCreateDto.farmId;
        const farm = await Farm.findById(farmId);
        if (!farm) {
            return null;
        }

        const plant = new Plant({
            userId: userId,
            farmId: farmId,
            farmerId: farm?.farmerId,
            name: "닉네임",
            image: "https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/createdApple.jpeg",
        });

        await plant.save();

        const data = {
            _id: plant.id,
        };

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getPlants = async (userId: string): Promise<PlantResponseDto | null> => {
    try {
        const plants = await Plant.find({ userId: userId }).populate(
            "farmId",
            "farmName address"
        );

        if (!plants) {
            return null;
        }

        const tmp = await Promise.all(
            plants.map(async (plant: any) => {
                let notifications = 0;
                const farm = await Farm.findById(plant.farmId);
                const feeds = await Feed.find({ plantId: plant._id });
                for (const feed of feeds) {
                    const comments = feed.comments;
                    for (const comment of comments) {
                        if (
                            !comment.userId.equals(
                                new mongoose.Types.ObjectId(userId)
                            ) &&
                            comment.isRead == false
                        ) {
                            notifications++;
                        }
                    }
                }

                const result = {
                    plantId: plant._id,
                    farmName: plant.farmId.farmName,
                    farmAddress: plant.farmId.address,
                    notifications: notifications,
                    name: plant.name,
                    image: plant.image,
                    weather: farm?.weather,
                    temperature: farm?.temperature,
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
    userId: string,
    plantId: string
): Promise<FeedResponseDto | null> => {
    try {
        const plant = await Plant.findById(plantId);
        const feeds = await Feed.find({ plantId: plantId })
            .sort({
                createdAt: -1, // 최신순 정렬
            })
            .populate("comments.userId", "userName profileImage");

        if (!plant || !feeds) {
            return null;
        }

        const farm = await Farm.findById(plant?.farmId);

        if (!farm) {
            return null;
        }

        await Feed.updateMany(
            {
                plantId: plant._id,
                "comments.isRead": false,
            },
            {
                $set: {
                    "comments.$[elem].isRead": true,
                },
            },
            { arrayFilters: [{ "elem.userId": { $ne: userId } }] }
        );

        const tmp = await Promise.all(
            feeds.map(async (feed: any) => {
                const tmpComments = await Promise.all(
                    feed.comments.map(async (comment: any) => {
                        const result = {
                            userName: comment.userId.userName,
                            profileImage: comment.userId.profileImage,
                            comment: comment.comment,
                        };

                        return result;
                    })
                );
                const result = {
                    feedId: feed._id,
                    images: feed.images,
                    content: feed.content,
                    comments: tmpComments,
                    createdAt: feed.createdAt,
                };

                return result;
            })
        );

        const data = {
            plantName: plant.name,
            farmName: farm.farmName,
            farmAdress: farm.address,
            weather: farm.weather,
            temperature: farm.temperature,
            humidity: farm.humidity,
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
    createPlant,
    getFeedsByPlantId,
};
