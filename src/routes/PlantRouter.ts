import { Router } from "express";
import { PlantController } from "../controllers";
import auth from "../middleware/auth";

const router: Router = Router();

router.post("/", auth, PlantController.createPlant);
router.get("/", auth, PlantController.getPlants);
router.get("/:plantId/feed", auth, PlantController.getFeedsByPlantId);

export default router;
