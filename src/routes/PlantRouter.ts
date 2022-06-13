import { Router } from "express";
import { PlantController } from "../controllers";
import auth from "../middleware/auth";

const router: Router = Router();

router.get("/", auth, PlantController.getPlants);

export default router;
