import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { apiRouter } from "./Routers/apiRouter.js";
import { authRouter } from "./Routers/authRouter.js";

const serverApp = express();
dotenv.config();

// require("dotenv").config();
const PORT = process.env.PORT || 4000;

// Add middleware for handling CORS requests from index.html
serverApp.use(cors());

// Add middware for parsing request bodies:
serverApp.use(express.json());
serverApp.use(express.urlencoded({ extended: false }));

// Mount routers
serverApp.use("/", authRouter);
serverApp.use("/", apiRouter);

serverApp.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

serverApp.listen(PORT, () => {
  console.log(`serverApp is listening on port ${PORT}`);
});
