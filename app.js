import express from "express";
import cors from "cors";
import { userRouter } from "./routes/user.mjs";
import { sauceRouter } from "./routes/sauce.mjs";

export const app = express();

app.use(express.static("./public/src"));
app.use("/images", express.static("./public/src/images"));

app.use(cors());
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//   );
//   next();
// });

// Intercepte les requêtes dont le content-type est json,
// et rend leur contenu dispo dans req.body
app.use(express.json());

app.use("/api/auth", userRouter);
app.use("/api/sauces", sauceRouter);
//WHAT User non connecté voit les sauces ?
