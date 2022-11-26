import { Router } from "express";
import {
  createSauce,
  deleteSauce,
  getAllSauces,
  getSauce,
  likeSauce,
  updateSauce,
} from "../controllers/sauce.mjs";
import { isConnected } from "../middleware/isConnected.mjs";
import { saveImage } from "../middleware/upload.mjs";

const router = Router();

router.get("/", isConnected, getAllSauces);
router.get("/:id", isConnected, getSauce);

router.post("/", isConnected, saveImage, createSauce);
router.post("/:id/like", isConnected, likeSauce);

router.put("/:id", isConnected, updateSauce);

router.delete("/:id", isConnected, deleteSauce);

export { router as sauceRouter };
