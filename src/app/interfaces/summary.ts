import { Reading } from "./reading";

export interface SummaryReadings {
    readings: Reading[];
    disabledSensors: number;
}