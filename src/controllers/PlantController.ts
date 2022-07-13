import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { FeedCreateFarmerCommentDto } from "../interfaces/feed/FeedCreateFarmerCommentDto";
import { PlantCreateDto } from "../interfaces/plant/PlantCreateDto";
import message from "../modules/responseMessage";
import statusCode from "../modules/statusCode";
import util from "../modules/util";
import { PlantService } from "../services";

/**
 *  @route POST /user/plant
 *  @desc Create Plant
 *  @access Private
 */
const createPlant = async (req: Request, res: Response) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));
    }
    const userId = req.body.user.id;

    const plantCreateDto: PlantCreateDto = req.body;

    try {
        const data = await PlantService.createPlant(userId, plantCreateDto);
        if (!data)
            return res
                .status(statusCode.NOT_FOUND)
                .send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));

        res.status(statusCode.CREATED).send(
            util.success(statusCode.CREATED, message.CREATE_PLANT_SUCCESS, data)
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
 *  @route GET /user/plant
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
 *  @route GET /user/plant/:plantId/feed
 *  @desc Read Plant's Feeds
 *  @access Private
 */
const getFeedsByPlantId = async (req: Request, res: Response) => {
    const userId = req.body.user.id;
    const { plantId } = req.params;

    try {
        const data = await PlantService.getFeedsByPlantId(userId, plantId);
        if (!data)
            return res
                .status(statusCode.NOT_FOUND)
                .send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));

        res.status(statusCode.OK).send(
            util.success(statusCode.OK, message.READ_FEED_SUCCESS, data)
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
 *  @route GET /farmer/plant/:plantId/feed
 *  @desc Read Plant's Feeds
 *  @access Private
 */
const getFarmerFeedsByPlantId = async (req: Request, res: Response) => {
    const userId = req.body.user.id;
    const { plantId } = req.params;

    try {
        const data = await PlantService.getFarmerFeedsByPlantId(
            userId,
            plantId
        );
        if (!data)
            return res
                .status(statusCode.NOT_FOUND)
                .send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));

        res.status(statusCode.OK).send(
            util.success(statusCode.OK, message.READ_FEED_SUCCESS, data)
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
 *  @route POST /farmer/feed/:feedId/comment
 *  @desc Create farmer comment
 *  @access Private
 */
const createFarmerComment = async (req: Request, res: Response) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));
    }
    const userId = req.body.user.id;
    const { feedId } = req.params;

    const feedCreateFarmerCommentDto: FeedCreateFarmerCommentDto = req.body;

    try {
        const data = await PlantService.createFarmerComment(
            userId,
            feedId,
            feedCreateFarmerCommentDto
        );
        if (!data)
            return res
                .status(statusCode.NOT_FOUND)
                .send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));

        res.status(statusCode.CREATED).send(
            util.success(
                statusCode.CREATED,
                message.CREATE_FARMER_COMMENT_SUCCESS,
                data
            )
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
    createPlant,
    getFeedsByPlantId,
    getFarmerFeedsByPlantId,
    createFarmerComment,
};
