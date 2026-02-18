**🐄 VitalVet – AI-Enhanced IoT Cattle Health Monitoring System**


**📌 Overview:**

VitalVet is an end-to-end IoT-based cattle health monitoring system that collects physiological data using ESP32 sensors and analyzes health conditions through a real-time AI-powered dashboard.
The system integrates embedded hardware, REST APIs, database storage, and a machine learning-inspired risk scoring engine to provide intelligent health predictions.

**🏗 System Architecture:**
1️⃣ Device Layer
1. ESP32 microcontroller
2. MLX90614 (Infrared Temperature Sensor)
3. Pulse Sensor
4. MPU6050 (Motion Sensor)

2️⃣ Communication Layer

1. HTTP-based REST API
2. JSON payload transmission

3️⃣ Backend Layer

1. Node.js + Express
2. MongoDB (Local database)
3. ML-inspired Risk Scoring Engine

4️⃣ Frontend Layer
1. Real-time monitoring dashboard
2. Health classification system
3. AI Risk Score visualization

**📊 Dashboard Preview**
🟢 Healthy Condition : https://github.com/Somesh2605/Vitalvet-iot-health-monitoring/blob/main/Screenshot/Healthy%20Cattle.png

🔴 Critical Condition : https://github.com/Somesh2605/Vitalvet-iot-health-monitoring/blob/main/Screenshot/Critical%20Cattle.png

🔌 Hardware Circuit : https://github.com/Somesh2605/Vitalvet-iot-health-monitoring/blob/main/Screenshot/Circuit%20Diagram.jpeg

ML Prediction : https://github.com/Somesh2605/Vitalvet-iot-health-monitoring/blob/main/Screenshot/Ai%20Prediction%20with%20ML%20Flask.png

**🧠 ML Risk Prediction Engine**

The system includes a weighted risk scoring model based on physiological parameters:

1. Temperature deviations
2. Pulse abnormalities
3. Oxygen level variations

**The engine calculates a normalized risk score (0–1) and classifies health status as:**
🟢 Low Risk

🟡 Moderate Risk

🔴 High Risk

This enhances traditional threshold-based monitoring with predictive intelligence.

**⚙ Technologies Used**
1. ESP32
2. Arduino IDE
3. Node.js
4. Express.js
5. MongoDB
6. HTML / CSS
7. REST APIs
8. AI-inspired Risk Modeling

**🚀 Key Features**

1. Real-time IoT sensor data acquisition
2. RESTful backend integration
3. MongoDB data persistence
4. AI-powered health risk prediction
5. Cattle-specific threshold logic
6. Live monitoring dashboard
7. Clean modular project structure

**📂 Project Structure**
backend/
frontend/
firmware/
screenshots/
README.md
package.json

**👤 Author**
**Somesh Ashok Bagal**
