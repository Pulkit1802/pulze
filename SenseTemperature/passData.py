from http import client
import time 
import serial 
import pymongo
from pymongo import MongoClient
arduinoData = serial.Serial('com5',115200)
time.sleep(1)
cluster = MongoClient("mongodb+srv://ds-hack:XrjoFN3Clc7e4i34@dshack.gk1jil8.mongodb.net/dsHack",connect=False)
db = cluster["dsHack"]
collection = db["patiendatas"]

while True:
    while(arduinoData.inWaiting()==0):
        pass 
    #Ready to read 
    dataPacket = arduinoData.readline()
    dataPacket = str(dataPacket,'utf-8')
    time.sleep(5)
    collection.find_one_and_update({'name':'sara'},{'$set':{'age':dataPacket}})
