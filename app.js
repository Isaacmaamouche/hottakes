import express from "express";
import cors from "cors";
import { userRouter } from "./routes/user.mjs";
import { sauceRouter } from "./routes/sauce.mjs";

export const app = express();

app.use(express.static("./public/src"));
app.use("/images", express.static("./public/src/images"));

app.use(cors());

// Intercepte les requêtes dont le content-type est json,
// et rend leur contenu dispo dans req.body
app.use(express.json());

app.use("/api/auth", userRouter);
app.use("/api/sauces", sauceRouter);
//WHAT User non connecté voit les sauces ?
