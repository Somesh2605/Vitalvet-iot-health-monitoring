#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

String serverUrl = "https://vitalvet-backend.vercel.app/api/sensordata/post";

struct SensorData {
  float temperature;
  float oxygen;
  int pulse;
  String sensorId;
};

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }

  Serial.println("Connected to WiFi");
}

void loop() {

  SensorData data;
  readSensor(data);

  String payload = "{";
  payload += "\"temperature\":" + String(data.temperature, 2) + ",";
  payload += "\"oxygen\":" + String(data.oxygen, 2) + ",";
  payload += "\"pulse\":" + String(data.pulse) + ",";
  payload += "\"sensorId\":\"" + data.sensorId + "\"";
  payload += "}";

  HTTPClient http;
  http.begin(serverUrl);
  http.addHeader("Content-Type", "application/json");

  int responseCode = http.POST(payload);

  Serial.println("Response Code: " + String(responseCode));

  http.end();

  delay(300000); // 5 minutes
}

void readSensor(SensorData &data) {
  data.temperature = random(3700, 3900) / 100.0;
  data.oxygen = random(9200, 9900) / 100.0;
  data.pulse = random(60, 95);
  data.sensorId = "CATTLE_001";
}
