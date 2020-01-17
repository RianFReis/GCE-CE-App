import { Router } from "express";
import GalleryController from "../controllers/GalleryController";

const router = Router();

router.get("/", GalleryController.getAllPics);
router.post("/", GalleryController.addPic);
router.get("/:id", GalleryController.getAPic);
router.put("/:id", GalleryController.updatePic);
router.delete("/:id", GalleryController.deletePic);

export default router;
