#include <math.h> //contains common math functions 
//Variables: 
void setup() { 
 // put your setup code here, to run once: 
 Serial.begin(115200); //Start serial 
 
} 
void loop() { 
 // put your main code here, to run repeatedly: 
Serial.print(Thermister(analogRead(A0))); //This is basically saying - first run the Thermister function, passing in the value from the  
Serial.println("f"); //then print the c for celcius, and send a newline character (as denoted by the println rather than print 
delay(500); //wait half a second before repeating 
} 
//custom functions 
double Thermister(int RawADC) { 
double Temp; 
Temp = log(((10240000/RawADC) - 10000)); 
Temp = 1 / (0.001129148 + (0.000234125 + (0.0000000876741 * Temp * Temp ))* Temp ); 
Temp = Temp - 273.15;// Convert Kelvin to Celcius 
return Temp; 
}