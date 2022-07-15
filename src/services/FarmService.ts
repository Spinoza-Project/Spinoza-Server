import mongoose from "mongoose";
import { FarmFarmerResponseDto } from "../interfaces/farm/FarmFarmerResponseDto";
import { FarmResponseDto } from "../interfaces/farm/FarmResponseDto";
import { FarmSpecificResponseDto } from "../interfaces/farm/FarmSpecificResponseDto";
import { ReservationFarmerResponseDto } from "../interfaces/reservation/ReservationFarmerResponseDto";
import { ReservationResponseDto } from "../interfaces/reservation/ReservationResponseDto";
import { TourResponseDto } from "../interfaces/tour/TourResponseDto";
import Farm from "../models/Farm";
import Feed from "../models/Feed";
import Fruit from "../models/Fruit";
import Plant from "../models/Plant";
import Reservation from "../models/Reservation";
import Tour from "../models/Tour";
import User from "../models/User";

const getFarmsByFruitAndAddress = async (
    fruit: string,
    address: string
): Promise<FarmResponseDto | null> => {
    try {
        const farms = await Farm.find({
            fruit: fruit,
            address: { $regex: `${address}.*` },
        });

        if (!farms) {
            return null;
        }

        const tmp = await Promise.all(
            farms.map(async (farm: any) => {
                const result = {
                    farmId: farm._id,
                    farmName: farm.farmName,
                    introduction: farm.introduction,
                    address: farm.address,
                    images: farm.images,
                };

                return result;
            })
        );

        const data = {
            farms: tmp,
        };

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getFarmByFarmId = async (
    farmId: string
): Promise<FarmSpecificResponseDto | null> => {
    try {
        const farm = await Farm.findById(farmId).populate(
            "fruitTypes",
            "name information image"
        );

        if (!farm) {
            return null;
        }

        const tours = await Tour.find();

        const data: FarmSpecificResponseDto = {
            farmId: farm._id,
            farmName: farm.farmName,
            address: farm.address,
            phoneNumber: farm.phoneNumber,
            grade: farm.grade,
            tours: tours,
            fruitTypes: farm.fruitTypes,
            hashTags: farm.hashTags,
            introduction: farm.introduction,
            images: farm.images,
        };

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getReservationByFarmId = async (
    farmId: string
): Promise<ReservationResponseDto | null> => {
    try {
        const reservations = await Reservation.find({
            farmId: farmId,
        }).populate("fruitType", "name information image");

        if (!reservations) {
            return null;
        }

        const tmp = await Promise.all(
            reservations.map(async (reservation: any) => {
                const result = {
                    _id: reservation._id,
                    fruitType: {
                        _id: reservation.fruitType._id,
                        name: reservation.fruitType.name,
                        information: reservation.fruitType.information,
                        image: reservation.fruitType.image,
                    },
                    price: reservation.price,
                    reserved: reservation.reserved,
                };

                return result;
            })
        );

        const fruitTypes = await Fruit.find();

        const data = {
            reservations: tmp,
            fruitTypes: fruitTypes,
        };

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getTour = async (): Promise<TourResponseDto | null> => {
    try {
        const tours = await Tour.find();

        if (!tours) {
            return null;
        }

        const data = {
            tours: tours,
        };

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getFarmsByFarmerId = async (
    farmerId: string
): Promise<FarmFarmerResponseDto> => {
    try {
        const farms = await Farm.find({ farmerId: farmerId });

        const tmp = await Promise.all(
            farms.map(async (farm: any) => {
                const plants = await Plant.find({ farmId: farm._id });
                let notifications = 0;
                for (const plant of plants) {
                    const feeds = await Feed.find({ plantId: plant._id });
                    for (const feed of feeds) {
                        const comments = feed.comments;
                        for (const comment of comments) {
                            if (
                                !comment.userId.equals(
                                    new mongoose.Types.ObjectId(farmerId)
                                ) &&
                                comment.isRead == false
                            ) {
                                notifications++;
                            }
                        }
                    }
                }

                const result = {
                    farmId: farm._id,
                    farmName: farm.farmName,
                    farmAddress: farm.address,
                    farmImage: farm.images[0],
                    weather: farm.weather,
                    temperature: farm.temperature,
                    humidity: farm.humidity,
                    notifications: notifications,
                };

                return result;
            })
        );

        const data: FarmFarmerResponseDto = {
            farms: tmp,
        };

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getFarmerReservationByFarmId = async (
    farmId: string
): Promise<ReservationFarmerResponseDto | null> => {
    try {
        const reservations = await Reservation.find({
            farmId: farmId,
        })
            .populate("fruitType", "name information image")
            .populate("plantId", "userId farmId farmerId name image");

        if (!reservations) {
            return null;
        }

        const tmp = await Promise.all(
            reservations.map(async (reservation: any) => {
                const fruitType = await Fruit.findById(reservation.fruitType);
                let result;
                if (reservation.reserved) {
                    const user = await User.findById(
                        reservation.plantId.userId
                    );
                    result = {
                        _id: reservation._id,
                        plantId: reservation.plantId._id,
                        userName: user!.userName,
                        hasNotification: false,
                        color: fruitType!.color,
                        reserved: reservation.reserved,
                    };
                } else {
                    result = {
                        _id: reservation._id,
                        color: fruitType!.color,
                        reserved: reservation.reserved,
                    };
                }

                return result;
            })
        );

        const fruitTypes = await Fruit.find();

        const data = {
            reservations: tmp,
            fruitTypes: fruitTypes,
        };
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default {
    getFarmsByFruitAndAddress,
    getFarmByFarmId,
    getReservationByFarmId,
    getTour,
    getFarmsByFarmerId,
    getFarmerReservationByFarmId,
};
