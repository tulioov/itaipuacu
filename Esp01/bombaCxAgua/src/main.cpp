#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

const char* SSID = "SystemCall"; 
const char* PASSWORD = "SAV1949sav"; 

String BASE_URL = "http://192.168.100.143:8080/";

WiFiClient client;
HTTPClient http;


String httpRequest(String path)
{
  http.begin(BASE_URL + path);
  int httpCode = http.POST(path);

  if (httpCode < 0) {
    Serial.println("request error - " + httpCode);
    return "";
  }
  if (httpCode != HTTP_CODE_OK) {
    return "";
  }
  String response =  http.getString();
  http.end();

    Serial.println("resposta: " + response);
  return response;
}

void initWiFi() {

  delay(10);
  Serial.println("Conectando-se em: " + String(SSID));

  WiFi.begin(SSID, PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(100);
    Serial.print(".");
  }
  Serial.println();
  Serial.print("Conectado na Rede " + String(SSID) + " | IP => ");
  Serial.println(WiFi.localIP());
}

// ############## SETUP ################# //

void setup() {
  Serial.begin(9600);
  pinMode(0, OUTPUT);
  digitalWrite(0, HIGH);
  initWiFi();
}

// ############### LOOP ################# //

void loop() {

  Serial.println("[GET] /sensors - sending request... resposta:");

  if(httpRequest("/botaoBombaCasa/"+conn) == "1"){
    Serial.println("ligando");
    digitalWrite(0, LOW);
  }else{
    Serial.println("desligando");
    digitalWrite(0, HIGH);
  }

  Serial.println("");
  delay(1000);
}

