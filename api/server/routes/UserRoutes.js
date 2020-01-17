import { Router } from "express";
import UserController from "../controllers/UserController";
import Auth from "../utils/Auth";

const router = Router();

router.post("/", UserController.addUser);
router.post("/auth", UserController.authUser);
router.get("/:id", Auth(2), UserController.getAnUser);
router.put("/:id", Auth(2), UserController.updateUser);

export default router;
