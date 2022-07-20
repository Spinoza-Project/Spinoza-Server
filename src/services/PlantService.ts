import mongoose from "mongoose";
import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { FeedCreateFarmerCommentDto } from "../interfaces/feed/FeedCreateFarmerCommentDto";
import { FeedCreateUserCommentDto } from "../interfaces/feed/FeedCreateUserCommentDto";
import { FeedFarmerResponseDto } from "../interfaces/feed/FeedFarmerResponseDto";
import { FeedResponseDto } from "../interfaces/feed/FeedResponseDto";
import { PlantCreateDto } from "../interfaces/plant/PlantCreateDto";
import { PlantResponseDto } from "../interfaces/plant/PlantResponseDto";
import Farm from "../models/Farm";
import Feed from "../models/Feed";
import File from "../models/File";
import Plant from "../models/Plant";
import Reservation from "../models/Reservation";

const createPlant = async (
    userId: string,
    plantCreateDto: PlantCreateDto
): Promise<PostBaseResponseDto | null> => {
    try {
        const reservation = await Reservation.findById(
            plantCreateDto.reservationId
        );
        if (!reservation) {
            return null;
        }
        const farmId = reservation.farmId;
        const farm = await Farm.findById(farmId);
        if (!farm) {
            return null;
        }

        const plant = new Plant({
            userId: userId,
            farmId: farmId,
            farmerId: farm.farmerId,
            name: "닉네임",
            image: "https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/createdApple.jpeg",
        });

        await plant.save();

        await reservation.updateOne({
            $set: {
                reserved: true,
                plantId: plant._id,
            },
        });

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

        let plantImage = "";

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
                if (plantImage == "") plantImage = feed.images[0];

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
            plantImage: plantImage,
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

const createUserComment = async (
    userId: string,
    plantId: string,
    feedId: string,
    feedCreateUserCommentDto: FeedCreateUserCommentDto
): Promise<PostBaseResponseDto | null> => {
    try {
        const feed = await Feed.findById(feedId);

        if (!feed) return null;

        const comment = {
            userId: new mongoose.Types.ObjectId(userId),
            comment: feedCreateUserCommentDto.comment,
            isRead: false,
        };

        await feed.updateOne({
            $push: { comments: comment },
        });

        const data = {
            _id: feed._id,
        };

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getFarmerFeedsByPlantId = async (
    userId: string,
    plantId: string
): Promise<FeedFarmerResponseDto | null> => {
    try {
        const plant = await Plant.findById(plantId)
            .populate("userId", "userName")
            .populate(
                "farmId",
                "farmName address temperature weather humidity"
            );

        const feeds = await Feed.find({ plantId: plantId })
            .sort({
                createdAt: -1, // 최신순 정렬
            })
            .populate("comments.userId", "userName profileImage");

        if (!plant || !feeds) {
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

        let plantImage = "";

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
                if (plantImage == "") plantImage = feed.images[0];

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
            userName: (plant.userId as any).userName,
            plantName: plant.name,
            plantImage: plantImage,
            farmName: (plant.farmId as any).farmName,
            farmAddress: (plant.farmId as any).address,
            temperature: (plant.farmId as any).temperature,
            weather: (plant.farmId as any).weather,
            humidity: (plant.farmId as any).humidity,
            feeds: tmp,
        };

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const createFarmerFeed = async (
    userId: string,
    plantId: string,
    content: string,
    imageList: { location: string; originalName: string }[]
): Promise<PostBaseResponseDto | null> => {
    try {
        const images: string[] = await Promise.all(
            imageList.map(async (image) => {
                const file = new File({
                    link: image.location,
                    fileName: image.originalName,
                });

                await file.save();

                return file.link;
            })
        );

        const feed = new Feed({
            plantId: plantId,
            farmerId: userId,
            images: images,
            content: content,
            comments: [],
        });

        await feed.save();

        const data = {
            _id: feed._id,
        };

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const createFarmerComment = async (
    userId: string,
    feedId: string,
    feedCreateFarmerCommentDto: FeedCreateFarmerCommentDto
): Promise<PostBaseResponseDto | null> => {
    try {
        const feed = await Feed.findById(feedId);

        if (!feed) return null;

        const comment = {
            userId: new mongoose.Types.ObjectId(userId),
            comment: feedCreateFarmerCommentDto.comment,
            isRead: false,
        };

        await feed.updateOne({
            $push: { comments: comment },
        });

        const data = {
            _id: feed._id,
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
    createUserComment,
    getFarmerFeedsByPlantId,
    createFarmerFeed,
    createFarmerComment,
};
