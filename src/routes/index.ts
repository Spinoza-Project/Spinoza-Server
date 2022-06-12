//router index file
import { Router } from "express";
import UserRouter from "./UserRouter";

const router: Router = Router();

router.use("/api/user", UserRouter);

export default router;
