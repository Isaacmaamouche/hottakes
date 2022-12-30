import { Router } from "express";
import {
  createSauce,
  deleteSauce,
  getAllSauces,
  getSauce,
  likeSauce,
  updateSauce,
} from "../controllers/sauce.mjs";
import { auth } from "../middleware/auth.mjs";
import { isOwner } from "../middleware/isOwner.mjs";
import { saveImage } from "../middleware/upload.mjs";

const router = Router();

router.get("/", auth, getAllSauces);
router.get("/:id", auth, getSauce);

router.post("/", auth, saveImage, createSauce);
router.post("/:id/like", auth, likeSauce);

router.put("/:id", auth, isOwner, saveImage, updateSauce);

router.delete("/:id", auth, isOwner, deleteSauce);

export { router as sauceRouter };
