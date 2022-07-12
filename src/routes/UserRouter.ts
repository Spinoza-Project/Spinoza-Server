import { Router } from "express";
import { body } from "express-validator/check";
import { UserController } from "../controllers";
import auth from "../middleware/auth";

const router: Router = Router();

router.post(
    "/signup",
    [
        body("email").isEmail(), // email 형식
        body("password").isLength({ min: 6 }), // 최소 6자
        body("type").not().isEmpty(),
    ],
    UserController.createUser
);
router.post(
    "/signin",
    [
        body("email").isEmail(), // email 형식
        body("password").isLength({ min: 6 }), // 최소 6자
    ],
    UserController.signInUser
);
router.get("/me", auth, UserController.getUser);

export default router;
