import { Router } from "express";
import GalleryController from "../controllers/GalleryController";
import Auth from "../utils/Auth";
import multer from "multer";

const router = Router();

var storage = multer.memoryStorage({
  destination: function(req, file, callback) {
    callback(null, "");
  }
});
var upload = multer({ storage: storage }).single("file");

router.get("/", Auth(1), GalleryController.getAllPics);
router.post("/", Auth(2), upload, GalleryController.addPic);
router.get("/:id", Auth(1), GalleryController.getAPic);
router.put("/:id", Auth(2), GalleryController.updatePic);
router.delete("/:id", Auth(2), GalleryController.deletePic);

export default router;
