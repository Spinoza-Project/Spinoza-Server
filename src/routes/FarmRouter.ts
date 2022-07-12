import { Router } from "express";
import { FarmController } from "../controllers";
import auth from "../middleware/auth";

const router: Router = Router();

router.get("/user/farm", auth, FarmController.getFarmsByFruitAndAddress);
router.get("/user/farm/tour", auth, FarmController.getTour);
router.get("/user/farm/:farmId", auth, FarmController.getFarmByFarmId);
router.get(
    "/user/farm/:farmId/reservation",
    auth,
    FarmController.getReservationByFarmId
);
router.get("/farmer/farm", auth, FarmController.getFarmsByFarmerId);
router.get(
    "/farmer/farm/:farmId/reservation",
    auth,
    FarmController.getFarmerReservationByFarmId
);

export default router;
