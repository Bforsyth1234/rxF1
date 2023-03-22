import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Race } from '../models/race';
import { RaceDataService } from '../race-data.service';

@Component({
  selector: 'app-racing-data',
  templateUrl: './racing-data.page.html',
  styleUrls: ['./racing-data.page.scss'],
})
export class RacingDataPage implements OnInit {
  public selectedRacesSeason = '2020'
  public selectedLimit = 10;
  public offset = 0;
  public seasons: string[] = [
    '2018',
    '2019',
    '2020'
  ];
  public limits: number[] = [10, 15, 25];
  public racesPerSeason: Observable<Race[]> = this.raceDataService.getRacesPerSeason(this.selectedRacesSeason, this.selectedLimit, this.offset);

  constructor(
    public raceDataService: RaceDataService
  ) { }

  ngOnInit() {
  }

  getRacesPerSeason() {
    this.racesPerSeason = this.raceDataService.getRacesPerSeason(this.selectedRacesSeason, this.selectedLimit, this.offset);
  }

  getNext() {
    this.offset += this.selectedLimit;
    this.getRacesPerSeason();
  }
  getPrevious() {
    this.offset -= this.selectedLimit;
    this.getRacesPerSeason();
  }

  changeSelectedLimit() {
    this.getRacesPerSeason();
  }

  getCarsFinished(race: Race) {
    return race.results?.filter((result) => result.status === 'Finished').length
  }
    getCarsThatCrashed(race: Race) {
    return race.results?.filter((result) => result.status === 'Accident').length
  }

  getCarsThatPlusOned(race: Race) {
    return race.results?.filter((result) => result.status === '+1 Lap').length
  }
}

