import { Router } from "express";
import DocumentController from "../controllers/DocumentController";
import Auth from "../utils/Auth";
import multer from "multer";

const router = Router();

var storage = multer.memoryStorage({
  destination: function(req, file, callback) {
    callback(null, "");
  }
});
var upload = multer({ storage: storage }).single("file");

router.get("/", Auth(1), DocumentController.getAllDocs);
router.post("/", Auth(2), upload, DocumentController.addDoc);
router.get("/:id", Auth(1), DocumentController.getADoc);
router.put("/:id", Auth(2), DocumentController.updateDoc);
router.delete("/:id", Auth(2), DocumentController.deleteDoc);

export default router;
