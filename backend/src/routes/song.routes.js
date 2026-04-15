const express = require("express");
const songModel = require("../models/song.model");
const multer = require("multer");
const { uploadFile } = require("../service/storage.service");

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() }); // storage in temporary memory

router.post("/songs", upload.single("file"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  const fileData = await uploadFile(req.file);
  console.log(fileData);
  res.status(201).json({
    message: "Song created successfully",
    fileData,
  });
});

module.exports = router;
