import { Router } from "express";
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

export default router;
