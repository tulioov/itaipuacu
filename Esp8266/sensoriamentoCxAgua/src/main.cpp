#include <Arduino.h>
#include <esp8266wifi.h>
#include <esp8266httpclient.h>

const char *SSID = "SystemCall";
const char *PASSWORD = "SAV1949sav";

String BASE_URL = "http://192.168.100.143:8080/";

WiFiClient client;
HTTPClient http;

String httpRequest(String path)
{
  http.begin(BASE_URL + path);
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
  Serial.begin(9600);
  pinMode(D1, INPUT);
  pinMode(D4, INPUT);
  initWiFi();
}

// ############### LOOP ################# //

void loop()
{

  if (digitalRead(D1) == 1)
  {
    Serial.println("liga Bomba");
    httpRequest("/ligaDesliga/"){
  }
  if (digitalRead(D4) == 1)
  {
    Serial.println("Desliga Bomba");
     httpRequest("/ligaDesliga/"){
  }
  delay(1500);
}