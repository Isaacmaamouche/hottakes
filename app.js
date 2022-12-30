import express from "express";
import cors from "cors";
import { userRouter } from "./routes/user.mjs";
import { sauceRouter } from "./routes/sauce.mjs";

export const app = express();

// Set the static asset folder
app.use(express.static("./public/src"));
app.use("/images", express.static("./public/src/images"));

// Set the CORS policies
app.use(cors());

// Only looks at requests where the Content-Type header is json
// and parsed its content to make it available in req.body
app.use(express.json());

//App's routes
app.use("/api/auth", userRouter);
app.use("/api/sauces", sauceRouter);
