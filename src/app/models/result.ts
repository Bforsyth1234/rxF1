import { Driver } from "./driver";
import { DriversStanding } from "./driversStanding";
import { QualifyingResult } from "./qualifyingResult";

export interface Result {
    Constructor: any;
    Driver: Driver;
    FastestLap: any;
    Time: any;
    grid: string;
    laps: string;
    number: string;
    points: string;
    position: string;
    positionText: string;
    status: string;
    qualifying: QualifyingResult[];
    standing: DriversStanding[];
}