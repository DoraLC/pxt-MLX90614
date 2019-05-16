// tests go here; this will not be compiled when this package is used as a library

basic.forever(function () {
    serial.writeLine("O:" + MLX90614.temperature(TemperatureLocation.Object))
    serial.writeLine("A:" + MLX90614.temperature(TemperatureLocation.Ambiant))
    serial.writeLine("")
    basic.pause(500)
})
