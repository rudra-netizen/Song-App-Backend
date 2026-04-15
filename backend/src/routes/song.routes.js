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

  const song = await songModel.create({
    title: req.body.title,
    artist: req.body.artist,
    file: fileData.url,
    mood: req.body.mood,
  });

  console.log(fileData);
  res.status(201).json({
    message: "Song created successfully",
    song,
  });
});

router.get("/songs", async (req, res) => {
  const { mood } = req.query;
  const song = await songModel.find({
    mood: mood,
  });
  res.status(200).json({
    message: "Song Fetched Successfully",
    song,
  });
});

router.delete("/songs/:id", async (req, res) => {
  const { id } = req.params;
  await songModel.findOneAndDelete({
    _id: id,
  });
  res.status(200).json({
    message: "Music Deleted from MongoDB",
  });
});

router.patch("/songs/:id", async (req, res) => {
  const { id } = req.params;
  const { title, artist, mood } = req.body;
  const song = await songModel.findOneAndUpdate(
    {
      _id: id,
    },
    {
      title: title,
      artist: artist,
      mood: mood,
    },
  );
  res.status(200).json({
    message: "Music Updated in MongoDB",
    song,
  });
});
module.exports = router;
