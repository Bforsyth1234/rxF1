import { Result } from "./result";

export interface Race {
    date: string;
    raceName: string;
    round: string;
    season: string;
    time: string;
    url: string;
    results: Result[];
}
