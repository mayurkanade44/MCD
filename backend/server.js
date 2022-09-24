import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";

const app = express();
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

import restroRegistrationRouter from "./routes/restroRegRoute.js";
import auditRouter from "./routes/auditRoute.js";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

app.use("/api/restaurant", restroRegistrationRouter);
app.use("/api/audit", auditRouter);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, console.log("server is listing"));
  } catch (error) {
    console.log(error);
  }
};

start();
