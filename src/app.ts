import dotenv from "dotenv";
import dbConn from "./db";
import express from "express";
import { json } from "body-parser";
import userRouter from "./routes/user";

dotenv.config();
const port = process.env.PORT || 3009;

const app = express();

const sequelize = dbConn.getConnection();
sequelize.sync();

app.use(json());
app.use("/users", userRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
