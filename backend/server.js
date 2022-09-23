import express from 'express'
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";


const app = express();
dotenv.config();

import restroRegistrationRouter from './routes/restroRegRoute.js'



if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/restaurant", restroRegistrationRouter)


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
