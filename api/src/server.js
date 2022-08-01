require("dotenv").config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import { connect } from "./connect";

import userRouter from "./resources/user/user.router";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/test", (req, res) => {
  res.status(200).send({ message: "ok" });
});

app.use("/user", userRouter);

export const start = async () => {
  await connect();
  app.listen(3000, () => {
    console.log("...started server on 3000");
  });
};
