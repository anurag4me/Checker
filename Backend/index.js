require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Storage config  
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Route to handle form + file
app.post("/uploads", upload.single("answer"), (req, res) => {
  const fileInfo = req.file;
  console.log("Uploaded File:", fileInfo);
  res.json({ message: "File received successfully", file: fileInfo.filename });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
