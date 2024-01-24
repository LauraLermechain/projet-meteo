/* Include libraries of BME280 sensor */
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>

#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#include <ArduinoJson.h>

#define SCREEN_WIDTH 128 // OLED display width, in pixels
#define SCREEN_HEIGHT 64 // OLED display height, in pixels

/*#include <SPI.h>  // uncomment his if you are using SPI interface
#define BME_SCK 18
#define BME_MISO 19
#define BME_MOSI 23
#define BME_CS 5*/

#define SEALEVELPRESSURE_HPA (1013.25)

#define SCREEN_WIDTH 128 // OLED display width, in pixels
#define SCREEN_HEIGHT 64 // OLED display height, in pixels

// Declaration for an SSD1306 display connected to I2C (SDA, SCL pins)
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

Adafruit_BME280 bme; // I2C
//Adafruit_BME280 bme(BME_CS); // hardware SPI
//Adafruit_BME280 bme(BME_CS, BME_MOSI, BME_MISO, BME_SCK); // software SPI

int counter = 0;

float temperature = 0;
float totalTemperature = 0;
float averageTemperature = 0;

float pressure = 0;
float totalPressure = 0;
float averagePressure = 0;

float humidity = 0;
float totalHumidity = 0;
float averageHumidity = 0;

JsonDocument jsonData;

void setup() {
  Serial.begin(9600);

  Wire.pins(0,2);
  Wire.begin();

  if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) { // Address 0x3D for 128x64
    Serial.println(F("SSD1306 allocation failed"));
    for(;;);
  }
  delay(2000);

  bool status;

  // default settings
  // (you can also pass in a Wire library object like &Wire2)
  status = bme.begin(0x76);  
  if (!status) {
    Serial.println("Could not detect a BME280 sensor, Fix wiring Connections!");
    while (1);
  }

  Serial.println("-- Print BME280 readings--");
  Serial.println();
}

void loop() { 

  temperature = bme.readTemperature();
  pressure = bme.readPressure() / 100.0F;
  humidity = bme.readHumidity();

  Serial.print("Temperature = ");
  Serial.print(temperature);
  Serial.println(" C");
  
  // Convert temperature to Fahrenheit
  /*Serial.print("Temperature = ");
  Serial.print(1.8 * bme.readTemperature() + 32);
  Serial.println(" *F");*/
  
  Serial.print("Pression = ");
  Serial.print(pressure);
  Serial.println(" hPa");

  Serial.print("Humidite = ");
  Serial.print(humidity);
  Serial.println(" %");

  display.clearDisplay();
  display.setCursor(0, 10);
  display.setTextSize(1);
  display.setTextColor(WHITE);

  display.println("METEO");
  display.println();

  display.print("Temp. = ");
  display.print(temperature);
  display.println(" C");

  display.print("Press. = ");
  display.print(pressure);
  display.println(" hPa");

  display.print("Hum. = ");
  display.print(humidity);
  display.println(" %");

  display.display();

  counter++;

  Serial.println(counter);
  Serial.println();

  totalTemperature = totalTemperature + temperature;
  totalPressure = totalPressure + pressure;
  totalHumidity = totalHumidity + humidity;

  if (counter == 5) {

    averageTemperature = totalTemperature / 5;
    averagePressure = totalPressure / 5;
    averageHumidity = totalHumidity / 5;

    Serial.print("Moyenne temperature = ");
    Serial.print(averageTemperature);
    Serial.println(" C");

    Serial.print("Moyenne pression = ");
    Serial.print(averagePressure);
    Serial.println(" hPa");

    Serial.print("Moyenne humidite = ");
    Serial.print(averageHumidity);
    Serial.println(" %");

    Serial.println();

    jsonData["temperature"] = averageTemperature;
    jsonData["pression"] = averagePressure;
    jsonData["humidite"] = averageHumidity;

    serializeJsonPretty(jsonData, Serial);

    Serial.println();

    counter = 0;
    totalTemperature = 0;
    totalPressure = 0;
    totalHumidity = 0;
  }

  delay(5000);
}