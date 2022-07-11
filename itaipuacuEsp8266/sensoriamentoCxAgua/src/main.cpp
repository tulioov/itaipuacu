#include <Arduino.h>
#include <esp8266wifi.h>
#include <ESP8266HTTPClient.h>
#include <HCSR04.h>

const char *SSID = "SystemCall";
const char *PASSWORD = "SAV1949sav";
const byte triggerPin = 2;
const byte echoPin = 0;

boolean isConectado = false;
String BASE_URL = "http://192.168.100.143:8080";
// String BASE_URL = "http://192.168.100.121:8080";

WiFiClient client;
HTTPClient http;

String httpRequest(String path)
{
  http.begin(client, BASE_URL + path);
  int httpCode = http.POST(path);

  if (httpCode < 0)
  {
    Serial.println("request error - " + httpCode);
    return "";
  }
  if (httpCode != HTTP_CODE_OK)
  {
    return "";
  }
  String response = http.getString();
  http.end();

  Serial.println("resposta: " + response);
  return response;
}

void initWiFi()
{

  delay(10);
  Serial.println("Conectando-se em: " + String(SSID));

  WiFi.begin(SSID, PASSWORD);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(100);
    Serial.print(".");
  }
  Serial.println();
  Serial.print("Conectado na Rede " + String(SSID) + " | IP => ");
  Serial.println(WiFi.localIP());
  isConectado = true;
}

void medirDistancia()
{
  UltraSonicDistanceSensor distanceSensor(triggerPin, echoPin);
  double distance = distanceSensor.measureDistanceCm();
  httpRequest("/cxCasa/" + String(distance));
}

// ############## SETUP ################# //

void setup()
{
  pinMode(triggerPin, OUTPUT);
  pinMode(echoPin, OUTPUT);
  digitalWrite(triggerPin, LOW);
  digitalWrite(echoPin, LOW);
  Serial.begin(9600);
  initWiFi();
}

// ############### LOOP ################# //
void loop()
{
  if (isConectado)
  {
    medirDistancia();
  }
  delay(1000);
}