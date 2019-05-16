//% color=#F79532 icon="\uf491" block="MLX90614"

enum TemperatureLocation {
    //%block="Object"
    Object,
    //%block="Ambiant"
    Ambiant
}

namespace MLX90614 {
    const addr = 0x5A
    const obTempAddr = 0x07
    const amTempAddr = 0x06

    function read16(reg: NumberFormat.UInt8BE): number {
        pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE, true);
        let ret = pins.i2cReadNumber(addr, NumberFormat.UInt16LE, true);
        //ret |= pins.i2cReadNumber(addr, NumberFormat.UInt16LE) << 8
        return ret
    }

    function readTemp(reg: NumberFormat.UInt8BE): number {
        let temp = read16(reg)
        temp *= .02
        temp -= 273.15
        return temp
    }

    function objectTemp(): number{
        return readTemp(obTempAddr)
    }

    function ambientTemp(): number{
        return readTemp(amTempAddr)
    }

    //%block="Temperature %loc"
    export function temperature(loc: TemperatureLocation): number{
        switch (loc){
            case 0:
                return objectTemp();
            case 1:
                return ambientTemp();
            default:
                return 0;
        }
    }
}