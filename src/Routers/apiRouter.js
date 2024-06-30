import Router from "express-promise-router";
import passport from "passport";
import dotenv from "dotenv";
import { getUsers } from "../RouteHandlers/apiHandlers.js";
import multer from "multer";
import multerS3 from "multer-s3";
import ExifReader from "exifreader";

dotenv.config();

import {
  S3Client,
  ListBucketsCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

// const upload = multer({ dest: "./public/data/uploads/" });

const accessKeyId = process.env.ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://0cffae522cdd52172bbe596db41d0f8a.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    // accessKeyId: "95cb2db16ce2d1d07ce71fcfb9ded4da",
    // secretAccessKey:
    //   "420557aa6f8df0e5d05ea1dbd37865882324c29a7aa4877bdb5365176c566c55",
  },
});

const storageS3 = multerS3({
  s3: s3,
  bucket: "scr-v2023a",
  acl: "public-read",
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    // cb(null, Date.now().toString());
    cb(null, file.originalname);
  },
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
    // cb(null, file.originalname);
  },
});
const storageMS = multer.memoryStorage();

const upload = multer({ storage: storage });
const uploadMS = multer({ storage: storageMS });
const uploadS3 = multer({ storage: storageS3 });

export const apiRouter = Router();

apiRouter.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  getUsers
);

apiRouter.post(
  "/upload",
  // uploadMS.single("file"),
  async (req, res, next) => {
    let body = [];
    req
      .on("data", (chunk) => {
        console.log(chunk);
        body.push(chunk);
      })
      .on("end", async () => {
        console.log("end");
        body = Buffer.concat(body);
        console.log(body);
        const tags = await ExifReader.load(
          "https://r2storage.soy-cr.com/O-1.jpg"
        );

        console.log(tags);
      });
    next();
  },
  upload.single("file"),
  (req, res) => {
    // console.log(req);
    // console.log(req.file);
    // console.log(req.body);
    res.send("Thanx");
  }
);
