const express = require("express");
const cors = require("cors");

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/contact", (req, res) => {
  const { name, email } = req.body;
  console.log("Received form data:", name, email);
  res.json({ message: "Form received successfully", data: req.body });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
