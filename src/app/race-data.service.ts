import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, map, concatMap, take,} from 'rxjs';
import { Race } from './models/race';
import { DriversStanding } from './models/driversStanding';

@Injectable({
  providedIn: 'root'
})
export class RaceDataService {

  constructor(private http: HttpClient) { }

  getRacesPerSeason(season: string, limit: number, offset: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}${season}.json?limit=${limit}&offset=${offset}`).pipe(map((res: any) => res.MRData.RaceTable.Races))
      .pipe(
        concatMap((res: any) => {
          return res.map((race: Race) => {
            this.getRaceResults(race).pipe(take(1)).subscribe((data) => {
              race.results = data;
            })
            return res;
          });
        })
      ).pipe(
        concatMap((res: any) => {
          return res.map((race: Race) => {
            this.getQualifyingResults(race).pipe(take(1)).subscribe((data) => {
              race?.results?.map((result) => {
                result.qualifying = data.filter((qualifyingResult: any) => {
                  return qualifyingResult.Driver.driverId === result.Driver.driverId;
                });
              })
            })
            return res;
          });
        })
      )
      .pipe(
        concatMap((res: any) => {
          return res.map((race: Race) => {
            this.getDriverStandings(race).pipe(take(1)).subscribe((data) => {
              race?.results?.map((result) => {
                result.standing = data.filter((driversStandingResults: DriversStanding) => {
                  return driversStandingResults.Driver.driverId === result.Driver.driverId;
                });
              })
            })
            return res;
          });
        })
      )


  }

  getRaceResults(race: Race) {
    return this.http.get(`${environment.apiUrl}${race.season}/${race.round}/results.json`).pipe(map((res: any) => res.MRData.RaceTable.Races[0].Results));
  }
  getQualifyingResults(race: Race) {
    return this.http.get(`${environment.apiUrl}${race.season}/${race.round}/qualifying.json`).pipe(map((res: any) => res.MRData.RaceTable.Races[0].QualifyingResults));
  }
  getDriverStandings(race: Race) {
    return this.http.get(`${environment.apiUrl}${race.season}/${race.round}/driverStandings.json`).pipe(map((res: any) => res.MRData.StandingsTable.StandingsLists[0].DriverStandings));
  }
}
