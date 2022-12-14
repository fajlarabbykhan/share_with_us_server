import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";
const port = process.env.PORT || 4000;
const app = express();
dotenv.config();

//middlewares
app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(morgan("dev"));

app.use("/users", userRouter);

mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((error) => console.log(`${error} do not connected with mongo db`));
