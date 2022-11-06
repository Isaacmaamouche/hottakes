import { Router } from "express";
import { createAccount, login } from "../controllers/user.mjs";

const router = Router();

router.post("/signup", createAccount);
router.post("/login", login);

export { router as userRouter };
