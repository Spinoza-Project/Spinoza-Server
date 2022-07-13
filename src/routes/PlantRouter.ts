import { Router } from "express";
import upload from "../config/multer";
import { PlantController } from "../controllers";
import auth from "../middleware/auth";

const router: Router = Router();

router.post("/user/plant", auth, PlantController.createPlant);
router.get("/user/plant", auth, PlantController.getPlants);
router.get(
    "/user/plant/:plantId/feed",
    auth,
    PlantController.getFeedsByPlantId
);
router.get(
    "/farmer/plant/:plantId/feed",
    auth,
    PlantController.getFarmerFeedsByPlantId
);
router.post(
    "/farmer/feed/:feedId/comment",
    auth,
    PlantController.createFarmerComment
);
router.post(
    "/farmer/plant/:plantId/feed",
    auth,
    upload.array("file"),
    PlantController.createFarmerFeed
);

export default router;
