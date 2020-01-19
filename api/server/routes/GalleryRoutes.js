import { Router } from "express";
import GalleryController from "../controllers/GalleryController";
import Auth from "../utils/Auth";
import multer from "multer";

const router = Router();
var multipleUpload = multer({ storage: storage }).array("file");

router.get("/", Auth(1), GalleryController.getAllPics);
router.post("/", Auth(2), multipleUpload, GalleryController.addPic);
router.get("/:id", Auth(1), GalleryController.getAPic);
router.put("/:id", Auth(2), GalleryController.updatePic);
router.delete("/:id", Auth(2), GalleryController.deletePic);

export default router;
