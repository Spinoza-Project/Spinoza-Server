//router index file
import { Router } from "express";
import UserRouter from "./UserRouter";
import PlantRouter from "./PlantRouter";

const router: Router = Router();

router.use("/api/user", UserRouter);
router.use("/api/plant", PlantRouter);

export default router;
