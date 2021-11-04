#include <Arduino.h>
#include <esp8266wifi.h>
#include <ESP8266HTTPClient.h>

const char *SSID = "SystemCall";
const char *PASSWORD = "SAV1949sav";

const int trigP = 2; //D4 Or GPIO-2 of nodemcu
const int echoP = 0; //D3 Or GPIO-0 of nodemcu

long duration;
int distance;

String BASE_URL = "http://192.168.100.143:8080/";

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
}

// ############## SETUP ################# //

void setup()
{
  pinMode(trigP, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoP, INPUT);  // Sets the echoPin as an Input
  initWiFi();
  Serial.begin(9600);
}

// ############### LOOP ################# //

void loop()
{

  digitalWrite(trigP, LOW); // Makes trigPin low
  delayMicroseconds(2);     // 2 micro second delay

  digitalWrite(trigP, HIGH); // tigPin high
  delayMicroseconds(10);     // trigPin high for 10 micro seconds
  digitalWrite(trigP, LOW);  // trigPin low
  
  duration = pulseIn(echoP, HIGH); //Read echo pin, time in microseconds
  distance = duration * 0.034 / 2; //Calculating actual/real distance

  Serial.print("Distance = "); //Output distance on arduino serial monitor
  Serial.println(distance);
  delay(3000); //Pause for 3 seconds and start measuring distance again
}