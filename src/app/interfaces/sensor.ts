import { Reading } from "./reading";

export interface Sensor {
    id: number;
    type: string;
    isEnabled: string;
    sensorOk: Reading;
    mediumAlert: Reading;
    redAlert: Reading;
}

export interface SensorUpdate {
    readings: Reading[];
}

export enum SensorIconEnum {
    TEMPERATURE = 'icon-temperature.svg',
    PRESSURE = 'icon-presion.svg',
    WIND = 'icon-wind.svg',
    LEVELS = 'icon-levels.svg',
    ENERGY = 'icon-energy.svg',
    TENSION = 'icon-tension.svg',
    CO2 = 'icon-co2.svg',
    OTHER_GASES = 'icon-gases.svg'
}

export enum SensorTypeEnum {
    TEMPERATURE = 'Temperatura',
    PRESSURE = 'Presión',
    WIND = 'Viento',
    LEVELS = 'Niveles',
    ENERGY = 'Energía',
    TENSION = 'Tensíon',
    CO2 = 'Monóxido de carbono',
    OTHER_GASES = 'Otros gases'
}

