require("dotenv").config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import { connect } from "./connect";
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/test", (req, res) => {
  res.status(200).send("ok");
});

export const start = async () => {
  await connect();
  app.listen(3000, () => {
    console.log("...started server on 3000");
  });
};
