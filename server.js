import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routers/index.js";

dotenv.config();

const { PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI, { dbName: "MongoDB_Kontrolinis" })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());
app.use(router);

app.listen(PORT, () => console.log(`app is running at ${PORT}`));
