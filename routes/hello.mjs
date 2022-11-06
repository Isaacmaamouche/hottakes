import { sayHello } from "../controllers/hello.mjs";
import { Router } from "express";

const router = Router();

router.get("/", sayHello);

export { router as helloRouter };
