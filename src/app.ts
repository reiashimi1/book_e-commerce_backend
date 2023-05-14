import dotenv from "dotenv";
import dbConn from "./db";
import express from "express";
import { json } from "body-parser";
import userRouter from "./routes/user";

const port = process.env.PORT || 3009;
const app = express();

dotenv.config();

dbConn
  .testConnection()
  .then(() => console.log("Connection has been established successfully"));

app.use(json());
app.use("/users", userRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
