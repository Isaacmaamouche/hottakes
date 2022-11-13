import { Router } from "express";
import { createAccount, login } from "../controllers/user.mjs";
import { isConnected } from "../middleware/isConnected.mjs";

const router = Router();

router.post("/signup", createAccount);
router.post("/login", login);
router.post("/isconnected", isConnected, (req, res) => {
  console.debug("user is connected");
  res.status(201).json({ message: "user is connected" });
});

export { router as userRouter };
