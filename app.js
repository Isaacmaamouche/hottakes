import express from "express";
import cors from "cors";
import { helloRouter } from "./routes/hello.mjs";
import { userRouter } from "./routes/user.mjs";

export const app = express();

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

app.use("/", helloRouter);
app.use("/api/auth", userRouter);
