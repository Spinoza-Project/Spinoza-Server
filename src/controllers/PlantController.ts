import express, { Request, Response } from "express";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util";
import { PlantService } from "../services";

/**
 *  @route GET /plant
 *  @desc Read Plant
 *  @access Private
 */
const getPlants = async (req: Request, res: Response) => {
    const userId = req.body.user.id;

    try {
        const data = await PlantService.getPlants(userId);
        if (!data)
            return res
                .status(statusCode.NOT_FOUND)
                .send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));

        res.status(statusCode.OK).send(
            util.success(statusCode.OK, message.READ_PLANT_SUCCESS, data)
        );
    } catch (error) {
        console.log(error);
        // 서버 내부에서 오류 발생
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(
            util.fail(
                statusCode.INTERNAL_SERVER_ERROR,
                message.INTERNAL_SERVER_ERROR
            )
        );
    }
};

/**
 *  @route GET /plant/:plantId/feed
 *  @desc Read Plant's Feeds
 *  @access Private
 */
const getFeedsByPlantId = async (req: Request, res: Response) => {
    const { plantId } = req.params;

    try {
        const data = await PlantService.getFeedsByPlantId(plantId);
        if (!data)
            return res
                .status(statusCode.NOT_FOUND)
                .send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));

        res.status(statusCode.OK).send(
            util.success(statusCode.OK, message.READ_PLANT_SUCCESS, data)
        );
    } catch (error) {
        console.log(error);
        // 서버 내부에서 오류 발생
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(
            util.fail(
                statusCode.INTERNAL_SERVER_ERROR,
                message.INTERNAL_SERVER_ERROR
            )
        );
    }
};

export default {
    getPlants,
    getFeedsByPlantId,
};
