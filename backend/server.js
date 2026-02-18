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


// ---------------- ML Risk Scoring Function ----------------

function calculateRisk(temperature, pulse, oxygen) {
  let score = 0;

  // Temperature weight
  if (temperature > 39.5) score += 0.4;
  else if (temperature > 39) score += 0.2;

  if (temperature < 38) score += 0.3;

  // Pulse weight
  if (pulse > 90) score += 0.3;
  else if (pulse > 84) score += 0.2;

  if (pulse < 48) score += 0.3;

  // Oxygen weight
  if (oxygen < 90) score += 0.4;
  else if (oxygen < 92) score += 0.2;

  return Math.min(score, 1); // cap score at 1
}


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


// ---------------- GET ALL SENSOR DATA ----------------

app.get("/api/sensordata", async (req, res) => {
  try {
    const data = await Sensor.find().sort({ timestamp: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ---------------- ML Prediction API ----------------

app.get("/api/predict", async (req, res) => {
  try {
    const latest = await Sensor.findOne().sort({ timestamp: -1 });

    if (!latest) {
      return res.json({ message: "No data available" });
    }

    const riskScore = calculateRisk(
      latest.temperature,
      latest.pulse,
      latest.oxygen
    );

    let riskLevel = "Low";

    if (riskScore > 0.6) riskLevel = "High";
    else if (riskScore > 0.3) riskLevel = "Moderate";

    res.json({
      riskScore: riskScore.toFixed(2),
      riskLevel,
      temperature: latest.temperature,
      pulse: latest.pulse,
      oxygen: latest.oxygen
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
