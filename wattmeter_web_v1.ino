#include <Arduino.h>
#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <PZEM004Tv30.h>

#include <cmath>

#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"

#define WIFI_SSID "AX3000t-2g"
#define WIFI_PASSWORD "47318050"

#define API_KEY "AIzaSyA4EPFB2SCUSUVc9RkDDUXIlcWhIhwCJxM"
#define DATABASE_URL "https://esp32db-1c7ed-default-rtdb.europe-west1.firebasedatabase.app/" 

FirebaseData fbdo;

FirebaseAuth auth;
FirebaseConfig config;

PZEM004Tv30 pzem(&Serial1,18, 19); //TX RX

bool signupOK = false;

unsigned long previousMillis = 0; 
const long interval = 500;// Інтервал між вимірами 

void setup() {
  Serial.begin(115200);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;

  if (Firebase.signUp(&config, &auth, "", "")) {
    Serial.println("ok");
    signupOK = true;
  }
  else {
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }

  config.token_status_callback = tokenStatusCallback; 

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop() {
  unsigned long currentMillis = millis(); 
    if (Firebase.ready() && signupOK && currentMillis - previousMillis >= interval) {
      previousMillis = currentMillis;
      float voltage = pzem.voltage();
      voltage -= 2;
      char voltageStr[10]; // рядок для зберігання значення voltage
      dtostrf(voltage, 6, 1, voltageStr); // конвертація voltage до рядка з одним знаком після коми
      Serial.print("Voltage: ");      
      Serial.println(voltageStr);
      if(Firebase.RTDB.setString(&fbdo, "voltage", voltageStr))
      {
          Serial.println("Successfully");
      }
    }
    delay(50); 
}
