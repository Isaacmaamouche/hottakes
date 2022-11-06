import dotenv from "dotenv";
import http from "http";
import { connectDB } from "./utils/connectDB.mjs";
import { app } from "./app.js";
import mongoose from "mongoose";

dotenv.config();

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || "3000");

app.set("port", port);
const server = http.createServer(app);

const address = server.address();
const bind =
  typeof address === "string"
    ? "pipe " + address
    : "port: http://localhost:" + port;

const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

server.on("error", errorHandler);
server.on("listening", () => {
  console.log("Listening on " + bind);
});

//Connects to mongoDB
connectDB();

//Wait for the 'open' event to listen for request
mongoose.connection.once("open", () => {
  server.listen(port);
});
