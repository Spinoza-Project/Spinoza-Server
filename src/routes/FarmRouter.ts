import { Router } from "express";
import { FarmController } from "../controllers";
import auth from "../middleware/auth";

const router: Router = Router();

router.get("/", auth, FarmController.getFarmsByFruitAndAddress);
router.get("/:farmId", auth, FarmController.getFarmByFarmId);

export default router;
