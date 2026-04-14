const express = require("express");
const songModel = require("../models/song.model");
const multer = require("multer");

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() }); // storage in temporary memory

router.post("/songs", upload.single("file"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.status(201).json({
    message: "Song created successfully",
  });
});

module.exports = router;
