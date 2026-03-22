import express from "express";
import mongoose from "mongoose";

const app = express();

// middleware
app.use(express.json());
app.use(express.static("public"));

// connect mongodb
mongoose.connect("mongodb://localhost:27017/notesDB");

// schema
const Note = mongoose.model("Note", {
  text: String,
});

// routes
app.get("/notes", async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

app.post("/notes", async (req, res) => {
  const newNote = new Note({
    text: req.body.text,
  });
  await newNote.save();
  res.send("Saved");
});

app.delete("/notes/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});