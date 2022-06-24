import { FarmResponseDto } from "../interfaces/farm/FarmResponseDto";
import { FarmSpecificResponseDto } from "../interfaces/farm/FarmSpecificResponseDto";
import Farm from "../models/Farm";

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

        const data: FarmSpecificResponseDto = {
            farmId: farm._id,
            farmName: farm.farmName,
            address: farm.address,
            phoneNumber: farm.phoneNumber,
            fruitTypes: farm.fruitTypes,
            introduction: farm.introduction,
            images: farm.images,
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
};
