
//** add event type = [static,user_generated,register] */


//MQTT Standart connect message, not JSON
var connectMessage={
    username: String,
    password: String
}

//ESP32 publish over MQTT as JSON to topic 'readings'
var valuesUpdate={
    temp: Number,
    humidity: Number,
    pressure: Number
}

//Server will publish on topic 'lock' this JSON
var lockState ={
    state: ['LOCK','UNLOCK']//enum
}
