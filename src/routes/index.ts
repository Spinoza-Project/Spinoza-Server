//router index file
import { Router } from "express";
import FarmRouter from "./FarmRouter";
import PlantRouter from "./PlantRouter";
import UserRouter from "./UserRouter";

const router: Router = Router();

router.use("/api", UserRouter);
router.use("/api", PlantRouter);
router.use("/api", FarmRouter);

export default router;
