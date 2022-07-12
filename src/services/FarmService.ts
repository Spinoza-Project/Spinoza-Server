import { FarmResponseDto } from "../interfaces/farm/FarmResponseDto";
import { FarmSpecificResponseDto } from "../interfaces/farm/FarmSpecificResponseDto";
import { ReservationResponseDto } from "../interfaces/reservation/ReservationResponseDto";
import { TourResponseDto } from "../interfaces/tour/TourResponseDto";
import Farm from "../models/Farm";
import Reservation from "../models/Reservation";
import Tour from "../models/Tour";

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

        const data = {
            reservations: tmp,
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

export default {
    getFarmsByFruitAndAddress,
    getFarmByFarmId,
    getReservationByFarmId,
    getTour,
};
