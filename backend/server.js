const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ---------------- MongoDB Local Connection ----------------

mongoose.connect("mongodb://127.0.0.1:27017/vitalvet")
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch(err => {
    console.log("MongoDB Connection Error:", err);
  });

// ---------------- Schema ----------------

const sensorSchema = new mongoose.Schema({
  temperature: Number,
  oxygen: Number,
  pulse: Number,
  sensorId: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Sensor = mongoose.model("Sensor", sensorSchema);

// ---------------- POST API ----------------

app.post("/api/sensordata/post", async (req, res) => {
  try {
    const sensorData = new Sensor(req.body);
    await sensorData.save();
    res.status(201).json({ message: "Data saved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ---------------- GET API ----------------

app.get("/api/sensordata", async (req, res) => {
  try {
    const data = await Sensor.find().sort({ timestamp: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
