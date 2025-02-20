import { Reading } from "./reading";
import { Sensor } from "./sensor";

export interface Plant {
    id: number;
    name: string;
    country: string;
    sensors?: Sensor[];
    sensorOk?: Reading;
    mediumAlert?: Reading;
    redAlert?: Reading;
}

export interface PlantOut {
    name: string;
    country: string;
}
