const express = require("express");
const serverApp = express();
const cors = require("cors");

require("dotenv").config();
const PORT = process.env.PORT || 4000;

// Add middleware for handling CORS requests from index.html
serverApp.use(cors());

// Add middware for parsing request bodies:
serverApp.use(express.json());
serverApp.use(express.urlencoded({ extended: false }));

serverApp.get("/", (req, res) => {
  res.send("Hello World!");
});

serverApp.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

serverApp.listen(PORT, () => {
  console.log(`serverApp is listening on port ${PORT}`);
});
