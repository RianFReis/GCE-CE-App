import { Router } from "express";
import GalleryController from "../controllers/GalleryController";
import Auth from "../utils/Auth";

const router = Router();

router.get("/", Auth(1), GalleryController.getAllPics);
router.post("/", Auth(2), GalleryController.addPic);
router.get("/:id", Auth(1), GalleryController.getAPic);
router.put("/:id", Auth(2), GalleryController.updatePic);
router.delete("/:id", Auth(2), GalleryController.deletePic);

export default router;
