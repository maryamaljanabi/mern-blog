import express from "express";
require("dotenv").config({ path: path.join(__dirname, "../.env") });
import mongoose from "mongoose";
import postRoutes from "./routes/postRoutes";
import userRoutes from "./routes/userRoutes";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import connectDB from "./db/dbConfig";

const app = express();

function setupServer() {
  connectDB();
  middlewares();
  app.get("/", (req, res) => {
    res.json("hi from server");
  });
  app.use("/api/posts", postRoutes);
  app.use("/api/users", userRoutes);
  app.use(express.static(path.join(__dirname, "public")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });
}

function middlewares() {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
}

function startServer(port) {
  app.listen(port);
  console.log(`server started on port ${port}`);
}

setupServer();
startServer(5000);
