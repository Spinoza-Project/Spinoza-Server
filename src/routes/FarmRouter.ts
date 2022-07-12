import { Router } from "express";
import { FarmController } from "../controllers";
import auth from "../middleware/auth";

const router: Router = Router();

router.get("/", auth, FarmController.getFarmsByFruitAndAddress);
router.get("/tour", auth, FarmController.getTour);
router.get("/:farmId", auth, FarmController.getFarmByFarmId);
router.get("/:farmId/reservation", auth, FarmController.getReservationByFarmId);

export default router;
