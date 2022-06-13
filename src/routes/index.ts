//router index file
import { Router } from "express";
import UserRouter from "./UserRouter";
import PlantRouter from "./PlantRouter";
import FarmRouter from "./FarmRouter";

const router: Router = Router();

router.use("/api/user", UserRouter);
router.use("/api/plant", PlantRouter);
router.use("/api/farm", FarmRouter);

export default router;
